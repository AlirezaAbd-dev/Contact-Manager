import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { NextApiResponse } from "next";
import { NextRequest } from "../../../types";

import userCollection from "../collection/userCollection";
import client from "../databaseClient/client";
import signInValidation from "../validations/signInValidation";

const loginController = async (req: NextRequest, res: NextApiResponse) => {
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

    // Closing Connection With Database
    await client.close();

    // Sending Response
    res.setHeader("x-authentication-token", token);
    return res.send({ message: "ورود به حساب با موفقیت انجام شد." });
  }
};

export default loginController;
