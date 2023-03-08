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
  await client.connect();

  const saltRound: number = +process.env.SALT!;
  const jwtSecret = process.env.JWT_SECRET_KEY!;

  if (req.method === "POST") {
    const bodyValidation = signInValidation;

    const success = bodyValidation.safeParse(req.body)?.success;

    if (!success) {
      return res
        .status(400)
        .send({ message: "لطفا فیلدها را به درستی پر کنید!" });
    }

    const findUser = await userCollection
      .find({ email: req.body.email })
      .toArray();

    if (findUser.length !== 0) {
      return res
        .status(404)
        .send({ message: "این ایمیل قبلا استفاده شده است!" });
    }

    const hashPassword = await bcrypt.hash(req.body.password, saltRound);

    await userCollection.insertOne({
      email: req.body.email,
      password: hashPassword,
      contacts: [],
    });

    await client.close();

    const token = jwt.sign(
      JSON.stringify({ email: req.body.email }),
      jwtSecret
    );

    return res.send({ token });
  }
};

export default handler;
