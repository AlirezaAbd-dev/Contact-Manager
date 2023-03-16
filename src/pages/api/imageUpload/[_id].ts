import { NextApiResponse } from "next";
import formidable from "formidable";

import client from "../../../serveruUtils/databaseClient/client";
import userCollection from "../../../serveruUtils/collection/userCollection";
import verifyToken from "../../../serveruUtils/middleware/verifyToken";
import { CustomNextRequest } from "../../../../types";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req: CustomNextRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    await client.connect();
    const _id = req.query._id;
    const form = formidable({ maxFileSize: 1024 * 1024 });

    form.parse(req, async (err, fields, files) => {
      if (err?.httpCode === 413) {
        await client.close();
        return res
          .status(413)
          .json({ message: "حجم عکس باید کمتر از 1 مگابایت باشد!" });
      }

      if (!files.image) {
        await client.close();
        return res
          .status(400)
          .json({ message: "لطفا مقادیر را به درستی وارد نمایید!" });
      }

      const verifiedUser = verifyToken(req);

      if (!verifiedUser || !verifiedUser.email) {
        await client.close();
        return res
          .status(401)
          .json({ message: "شما به این صفحه درسترسی ندارید!" });
      }

      const findUser = await userCollection.findOne({
        email: verifiedUser?.email,
      });

      if (!findUser) {
        await client.close();
        return res.status(404).send({ message: "کاربر مورد نظر یافت نشد!" });
      }

      const findContact = findUser.contacts.find(
        (contact) => contact._id.toString() === _id
      );

      if (!findContact) {
        await client.close();
        return res.status(404).send({ message: "مخاطب مورد نظر یافت نشد!" });
      }

      
    });
  } else {
    return res.status(404).send("404 Not Found");
  }
};

export default handler;
