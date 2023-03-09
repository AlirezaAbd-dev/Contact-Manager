import { NextApiResponse } from "next";
import { ObjectId } from "mongodb";

import { CustomNextRequest } from "../../../../types";
import userCollection from "../../../serveruUtils/collection/userCollection";
import client from "../../../serveruUtils/databaseClient/client";
import verifyToken from "../../../serveruUtils/middleware/verifyToken";

const handler = async (req: CustomNextRequest, res: NextApiResponse) => {
  if (req.method === "DELETE") {
    const id = req.query._id;

    try {
      await client.connect();
    } catch (err) {
      return res
        .status(500)
        .send({ message: "اتصال با دیتابیس با خطا مواجه شد!" });
    }

    let request: CustomNextRequest;
    try {
      request = verifyToken(req);
    } catch (err) {
      await client.close();
      return res
        .status(500)
        .send({ message: "شما به این صفحه درسترسی ندارید!" });
    }

    const userEmail = req.body.user.email;

    await userCollection
      .updateOne(
        { email: userEmail },
        {
          $pull: {
            contacts: {
              _id: new ObjectId(id),
            },
          },
        }
      )
      .catch(async (err) => {
        await client.close();
        return res.status(404).send({ message: "مخاطب مورد نظر یافت نشد!" });
      });

    await client.close();
    return res.status(200).send({ message: "مخاطب با موفقیت حذف شد." });
  }
};

export default handler;
