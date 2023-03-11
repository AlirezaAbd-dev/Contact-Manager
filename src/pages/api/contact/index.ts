import { ObjectId, WithId } from "mongodb";
import { NextApiResponse } from "next";

import { CustomAddContactRequest } from "../../../../types";
import userCollection, {
  UserCollectiontype,
} from "../../../serveruUtils/collection/userCollection";
import client from "../../../serveruUtils/databaseClient/client";
import verifyToken from "../../../serveruUtils/middleware/verifyToken";
import addContactValidation from "../../../serveruUtils/validations/addContactValidation";

const handler = async (req: CustomAddContactRequest, res: NextApiResponse) => {
  // Check Request Method
  if (req.method === "POST") {
    // Database Connection
    try {
      await client.connect();
    } catch (err) {
      return res
        .status(500)
        .send({ message: "اتصال با دیتابیس با خطا مواجه شد!" });
    }

    const { fullname, image, phone, email, job } = req.body;

    // Validate Request Body
    const isBodyValid = addContactValidation.safeParse({
      fullname,
      image,
      phone,
      email,
      job,
    });

    if (!isBodyValid.success) {
      await client.close();
      return res
        .status(400)
        .send({ message: "لطفا تمام فیلد ها را به درستی وارد کنید!" });
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

    // Finding User From Database
    let findUser: WithId<UserCollectiontype> | null;
    try {
      findUser = await userCollection.findOne({ email: userEmail });
    } catch {
      await client.close();
      return res.status(404).send({ message: "کاربر مورد نظر یافت نشد!" });
    }

    // Checking If Contact Exists Then Client Should Use Another fullname Value Or Continue
    const isUserExisted = findUser?.contacts.find(
      (contact) => contact.fullname === req.body.fullname
    );

    if (isUserExisted) {
      await client.close();
      return res
        .status(400)
        .send({ message: "نام این مخاطب در لیست شما وجود دارد!" });
    }

    // Add Contact To Contacts
    const user = await userCollection.findOneAndUpdate(
      { email: userEmail },
      {
        $push: {
          contacts: {
            _id: new ObjectId(),
            fullname,
            email,
            phone,
            job,
            image,
          },
        },
      }
    );

    if (!user.ok) {
      await client.close();
      return res
        .status(500)
        .send({ message: "خطا در برقراری ارتباط با پایگاه داده!" });
    }

    // Closing Connection To Database
    await client.close();
    // Sending New Contact's Data As Response
    return res.send({
      _id: user.value?._id,
      fullname,
      email,
      phone,
      job,
      image,
    });
  } else {
    // req.method !== "POST"
    await client.close();
    return res.status(404).send("404 Not Found");
  }
};

export default handler;
