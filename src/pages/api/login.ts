import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";

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
  // Environment Variables
  const jwtSecret = process.env.JWT_SECRET_KEY!;

  // Check The Request Method
  if (req.method === "POST") {
    // Database Connection
    try {
      await client.connect();
    } catch (err) {
      return res
        .status(500)
        .send({ message: "اتصال با دیتابیس با خطا مواجه شد!" });
    }

    // Validating Request Body
    const success = signInValidation.safeParse(req.body)?.success;

    if (!success) {
      return res
        .status(400)
        .send({ message: "لطفا فیلدها را به درستی پر کنید!" });
    }

    // Finding User In Database
    const findUser = await userCollection
      .find({ email: req.body.email })
      .toArray();

    // Check If There Isn't A User In Database
    if (findUser.length === 0) {
      return res
        .status(404)
        .send({ message: "ایمیل و یا رمزعبور وارد شده اشتباه است!" });
    }

    // Compare Password Of Request Body With Hashed Password
    const isPasswordtrue = await bcrypt.compare(
      req.body.password,
      findUser[0].password
    );

    if (!isPasswordtrue) {
      return res
        .status(400)
        .send({ message: "ایمیل و یا رمزعبور وارد شده اشتباه است!" });
    }

    // Creating JsonWebToken
    const token = sign(JSON.stringify({ email: req.body.email }), jwtSecret);

    // Sending Response
    res.setHeader("x-authentication-token", token);
    return res.send({ message: "ورود به حساب با موفقیت انجام شد." });
  }
  // Closing Connection With Database
  await client.close();
};

export default handler;
