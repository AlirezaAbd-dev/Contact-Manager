import { WithId } from "mongodb";
import { NextApiResponse } from "next";

import { CustomNextRequest } from "../../../../types";
import userCollection, {
  UserCollectiontype,
} from "../../../serveruUtils/collection/userCollection";
import client from "../../../serveruUtils/databaseClient/client";
import verifyToken from "../../../serveruUtils/middleware/verifyToken";

const handler = async (req: CustomNextRequest, res: NextApiResponse) => {
  // Check Request Method
  if (req.method === "GET") {
    // Getting Queries From URL
    const contactId = req.query._id;

    // Database Connection
    try {
      await client.connect();
    } catch (err) {
      return res
        .status(500)
        .send({ message: "اتصال با دیتابیس با خطا مواجه شد!" });
    }

    // Validate Request Body
    const verifiedUser = verifyToken(req);

    if (!verifiedUser || !verifiedUser.email) {
      await client.close();
      return res
        .status(500)
        .send({ message: "شما به این صفحه درسترسی ندارید!" });
    }

    const userEmail = verifiedUser.email;

    // Finding User In Database
    let findUser: WithId<UserCollectiontype> | null;
    try {
      findUser = await userCollection.findOne({ email: userEmail });
    } catch {
      await client.close();
      return res.status(404).send({ message: "کاربر مورد نظر یافت نشد!" });
    }

    // Find Specific Contact Form Contacts
    const contact = findUser?.contacts.find(
      (contact) => contact._id.toString() === contactId
    );

    if (!contact) {
      await client.close();
      return res.status(404).send({ message: "مخاطب مورد نظر یافت نشد!" });
    }

    // Closing Database Connection
    await client.close();

    // Send Contact As Response
    res.status(202).send({ contact });
  }else{
    // req.method !== "GET"
    await client.close();
    return res.status(404).send("404 Not Found");
  }
};

export default handler;
