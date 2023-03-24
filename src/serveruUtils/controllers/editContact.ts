import { ObjectId, WithId } from "mongodb";
import { NextApiResponse } from "next";
import { CustomAddContactRequest } from "../../../types";
import userCollection, {
  UserCollectiontype,
} from "../collection/userCollection";
import client from "../databaseClient/client";
import verifyToken from "../middleware/verifyToken";
import addContactValidation from "../validations/addContactValidation";

const editContact = async (
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

  const { fullname, phone, email, job } = req.body;

  // Validate Request Body
  const isBodyValid = addContactValidation.safeParse({
    fullname,
    phone,
    email,
    job,
  });

  if (!isBodyValid.success) {
    await client.close();
    return res.status(400).send({ message: "لطفا تمام فیلد ها را پر کنید!" });
  }

  // Validate Request JsonWebToken
  const verifiedUser = await verifyToken(req);

  if (!verifiedUser || !verifiedUser.email) {
    await client.close();
    return res.status(500).send({ message: "شما به این صفحه درسترسی ندارید!" });
  }

  const userEmail = verifiedUser.email;

  // Finding User From Database
  let findUser: WithId<UserCollectiontype> | null;
  try {
    findUser = await userCollection.findOne({ email: userEmail });
  } catch {
    await client.close();
    return res.status(404).send({ message: "کاربر مورد نظر یافت نشد!" });
  }
  // Filtering Out Current Contact For Avoiding Conflict
  const popUserout = findUser?.contacts.filter(
    (contact) => contact._id.toString() !== contactId
  );
  // Checking If There Is Another Contact With The Same Name? Then Return It To Variable And Sending 404 As Response
  const isUserExisted = popUserout?.find(
    (contact) => contact.fullname === fullname
  );

  if (isUserExisted) {
    await client.close();
    return res
      .status(400)
      .send({ message: "نام این مخاطب در لیست شما وجود دارد!" });
  }

  const image = findUser?.contacts.find(
    (contact) => contact._id.toString() === contactId
  )?.image;

  // Update Chosen Contact To New Values
  try {
    await userCollection.updateOne(
      {
        email: userEmail,
        "contacts._id": new ObjectId(contactId),
      },
      {
        $set: {
          "contacts.$": {
            _id: new ObjectId(contactId),
            fullname,
            job,
            image,
            phone,
            email,
          },
        },
      }
    );
  } catch {
    await client.close();
    return res.status(404).send({ message: "کاربر مورد نظر یافت نشد!" });
  }

  // Closing Database Connection
  await client.close();

  // Sending New Edited Contact As Response
  return res.send({
    _id: new ObjectId(contactId),
    fullname,
    email,
    phone,
    job,
    image,
  });
};

export default editContact;
