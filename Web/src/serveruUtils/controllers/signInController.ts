import { NextApiResponse } from "next";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { NextRequest } from "../../../types";
import signInValidation from "../validations/signInValidation";
import dbConnect from "../database/dbConnect";
import UserModel, { UserModelType } from "../models/userModel";

const signInController = async (req: NextRequest, res: NextApiResponse) => {
  // Environment Variables
  const saltRound: number = +process.env.SALT!;
  const jwtSecret = process.env.JWT_SECRET_KEY!;

  // Check The Request Method
  if (req.method === "POST") {
    // Database Connection
    await dbConnect();

    // Validating Request Body
    const success = signInValidation.safeParse(req.body)?.success;

    if (!success) {
      // Closing Connection With Database
      return res
        .status(400)
        .send({ message: "لطفا فیلدها را به درستی پر کنید!" });
    }

    // Search For User In Database
    const findUser = await UserModel.findOne<UserModelType>({
      email: req.body.email,
    });

    if (findUser) {
      // Closing Connection With Database
      return res
        .status(403)
        .send({ message: "این ایمیل قبلا استفاده شده است!" });
    }

    // Hashing Password
    const hashPassword = await bcrypt.hash(req.body.password, saltRound);

    // Creating User In Database In case There Is No Similar User
    await UserModel.create({
      email: req.body.email,
      password: hashPassword,
      resetPassAmount: 0,
    })
      .then(() => {
        // Creating JsonWebToken
        const token = jwt.sign(
          JSON.stringify({ email: req.body.email, resetPassAmount: 0 }),
          jwtSecret
        );

        // Sending Response
        res.setHeader("x-authentication-token", token);
        return res.send({ message: "ثبت نام با موفقیت انجام شد." });
      })
      .catch(() => {
        res.status(500).send({ message: "خطایی در پایگاه داده به وجود آمد!" });
      });
  }
};

export default signInController;
