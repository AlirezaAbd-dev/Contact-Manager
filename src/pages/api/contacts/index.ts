import { NextApiResponse } from "next";

import { CustomNextRequest } from "../../../../types";
import userCollection from "../../../serveruUtils/collection/userCollection";
import client from "../../../serveruUtils/databaseClient/client";
import verifyToken from "../../../serveruUtils/middleware/verifyToken";

const handler = async (req: CustomNextRequest, res: NextApiResponse) => {
    try {
        await client.connect();
      } catch (err) {
        return res
          .status(500)
          .send({ message: "اتصال با دیتابیس با خطا مواجه شد!" });
      }

  if (req.method === "GET") {
    let request: CustomNextRequest;
    try {
      request = verifyToken(req);
    } catch (err) {
      await client.close();
      return res
        .status(500)
        .send({ message: "شما به این صفحه درسترسی ندارید!" });
    }

    const userEmail = request.body.user.email;

    const user = await userCollection.findOne({ email: userEmail });
    if (!user) {
      await client.close();
      return res.status(404).send({ message: "کاربر مورد نظر یافت نشد!" });
    }

    await client.close();
    return res.status(200).send({ contacts: user.contacts });
  }
};

export default handler;
