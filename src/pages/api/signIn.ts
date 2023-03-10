import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import client from "../../serveruUtils/databaseClient/client";
import userCollection from "../../serveruUtils/collection/userCollection";
import signInValidation from "../../serveruUtils/validations/signInValidation";

interface NextRequest extends NextApiRequest {
  body: {
    email: string;
    password: string;
  };
}

const handler = async (req: NextRequest, res: NextApiResponse) => {
  // Database Connection
  try {
    await client.connect();
  } catch (err) {
    return res
      .status(500)
      .send({ message: "اتصال با دیتابیس با خطا مواجه شد!" });
  }

  // Environment Variables
  const saltRound: number = +process.env.SALT!;
  const jwtSecret = process.env.JWT_SECRET_KEY!;

  // Check The Request Method
  if (req.method === "POST") {
    // Validating Request Body
    const success = signInValidation.safeParse(req.body)?.success;

    if (!success) {
      return res
        .status(400)
        .send({ message: "لطفا فیلدها را به درستی پر کنید!" });
    }

    // Search For User In Database
    const findUser = await userCollection
      .find({ email: req.body.email })
      .toArray();

    if (findUser.length !== 0) {
      return res
        .status(404)
        .send({ message: "این ایمیل قبلا استفاده شده است!" });
    }

    // Hashing Password
    const hashPassword = await bcrypt.hash(req.body.password, saltRound);

    // Creating User In Database In case There Is No Similar User
    await userCollection.insertOne({
      email: req.body.email,
      password: hashPassword,
      contacts: [],
    });

    // Creating JsonWebToken
    const token = jwt.sign(
      JSON.stringify({ email: req.body.email }),
      jwtSecret
    );

    // Sending Response
    res.setHeader("x-authentication-token", token);
    return res.send({ message: "ثبت نام با موفقیت انجام شد." });
  }
  // Closing Connection With Database
  await client.close();
};

export default handler;
