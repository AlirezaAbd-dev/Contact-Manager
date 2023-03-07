import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import bcrypt from "bcrypt";

import client from "../../serveruUtils/databaseClient/client";
import userCollection from "../../serveruUtils/collection/userCollection";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await client.connect();

  if (req.method === "POST") {
    const bodyValidation = z.object({
      email: z.string({
        required_error: "email feild is required!",
      }),
      password: z.string({
        required_error: "password feild is required!",
      }),
    });

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

    

    client.close();

    return res.send({ text: "yoyo" });
  }
};

export default handler;
