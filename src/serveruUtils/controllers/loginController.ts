import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextApiResponse } from "next";

import { NextRequest } from "../../../types";
import dbConnect from "../database/dbConnect";
import UserModel, { UserModelType } from "../models/userModel";
import signInValidation from "../validations/signInValidation";

const loginController = async (req: NextRequest, res: NextApiResponse) => {
  // Check The Request Method
  if (req.method === "POST") {
    // Database Connection
    await dbConnect();

    // Validating Request Body
    const success = signInValidation.safeParse(req.body)?.success;

    if (!success) {
      return res
        .status(400)
        .send({ message: "لطفا فیلدها را به درستی پر کنید!" });
    }

    // Finding User In Database
    const findUser = await UserModel.findOne<UserModelType>({
      email: req.body.email,
    });

    // Check If There Isn't A User In Database
    if (!findUser) {
      return res
        .status(404)
        .send({ message: "ایمیل و یا رمزعبور وارد شده اشتباه است!" });
    }

    // Compare Password Of Request Body With Hashed Password
    const isPasswordtrue = await bcrypt.compare(
      req.body.password,
      findUser.password
    );

    if (!isPasswordtrue) {
      return res
        .status(400)
        .send({ message: "ایمیل و یا رمزعبور وارد شده اشتباه است!" });
    }

    // Creating JsonWebToken
    const token = jwt.sign(
      JSON.stringify({
        email: req.body.email,
        resetPassAmount: findUser.resetPassAmount,
      }),
      process.env.JWT_SECRET_KEY!
    );

    // Sending Response
    res.setHeader("x-authentication-token", token);
    return res.send({ message: "ورود به حساب با موفقیت انجام شد." });
  }
};

export default loginController;
