import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import bcrypt from "bcrypt";

import client from "../../serveruUtils/databaseClient/client";
import userCollection from "../../serveruUtils/collection/userCollection";
import signInValidation from "../../serveruUtils/validations/signInValidation";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await client.connect();

  const saltRound: number = +process.env.SALT!;
  const passwordPlaneText = process.env.PLANE_TEXT_HASH!;

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

    const hashPassword = await bcrypt.hash(passwordPlaneText, saltRound);

    const addedUser = await userCollection.insertOne({
      email: req.body.email,
      password: hashPassword,
      contacts: [],
    });

    await client.close();

    return res.send({ addedUser });
  }
};

export default handler;
