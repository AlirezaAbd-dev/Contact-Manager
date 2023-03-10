import { NextApiResponse } from "next";
import { ObjectId } from "mongodb";

import { CustomNextRequest } from "../../../../types";
import userCollection from "../../../serveruUtils/collection/userCollection";
import client from "../../../serveruUtils/databaseClient/client";
import verifyToken from "../../../serveruUtils/middleware/verifyToken";

const handler = async (req: CustomNextRequest, res: NextApiResponse) => {
  // Check Request Method
  if (req.method === "DELETE") {
    // Getting Queries From URL
    const id = req.query._id;

    // Database Connection
    try {
      await client.connect();
    } catch (err) {
      return res
        .status(500)
        .send({ message: "اتصال با دیتابیس با خطا مواجه شد!" });
    }

    // Validate Request JsonWebToken
    const verifiedUser = verifyToken(req);

    if (!verifiedUser || !verifiedUser.email) {
      await client.close();
      return res
        .status(500)
        .send({ message: "شما به این صفحه درسترسی ندارید!" });
    }

    const userEmail = verifiedUser.email;

    // Delete The Chosen Cintact From Contacts In Database With $pull Query
    try {
      await userCollection.updateOne(
        { email: userEmail },
        {
          $pull: {
            contacts: {
              _id: new ObjectId(id),
            },
          },
        }
      );
    } catch (err) {
      await client.close();
      return res.status(404).send({ message: "مخاطب مورد نظر یافت نشد!" });
    }

    // Closing Database Connection
    await client.close();

    // Sending Success Message As Response
    return res.status(200).send({ message: "مخاطب با موفقیت حذف شد." });
  } else {
    // req.method !== "DELETE"
    await client.close();
    return res.status(404).send("404 Not Found");
  }
};

export default handler;
