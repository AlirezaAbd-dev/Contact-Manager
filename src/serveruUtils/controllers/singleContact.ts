import { WithId } from "mongodb";
import { NextApiResponse } from "next";
import { CustomAddContactRequest } from "../../../types";
import userCollection, {
  UserCollectiontype,
} from "../collection/userCollection";
import client from "../databaseClient/client";
import verifyToken from "../middleware/verifyToken";

const singleContact = async (
  req: CustomAddContactRequest,
  res: NextApiResponse
) => {
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

  // Validate Request JsonWebToken
  const verifiedUser = await verifyToken(req);

  if (!verifiedUser || !verifiedUser.email) {
    await client.close();
    return res.status(401).send({ message: "شما به این صفحه درسترسی ندارید!" });
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
};

export default singleContact;
