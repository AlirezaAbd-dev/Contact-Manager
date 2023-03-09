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
    const page = req.query.page;

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
    
    if (page === "0" || !page) {
      return res.status(200).send({ contacts: user.contacts });
    } else {
      const numberOfItemInEveryPage = 12;
      const amountOfPages = Math.ceil(
        user.contacts.length / numberOfItemInEveryPage
      );

      const paginatedContacts = user.contacts.slice(
        +page - 1,
        numberOfItemInEveryPage * +page - 1
      );

      return res
        .status(200)
        .send({ contacts: paginatedContacts, pagesNumber: amountOfPages });
    }
  }
};

export default handler;
