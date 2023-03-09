import { ObjectId, WithId } from "mongodb";
import { NextApiResponse } from "next";

import { CustomAddContactRequest, CustomNextRequest } from "../../../../types";
import userCollection, {
  UserCollectiontype,
} from "../../../serveruUtils/collection/userCollection";
import client from "../../../serveruUtils/databaseClient/client";
import verifyToken from "../../../serveruUtils/middleware/verifyToken";
import addContactValidation from "../../../serveruUtils/validations/addContactValidation";

const handler = async (req: CustomAddContactRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      await client.connect();
    } catch (err) {
      return res
        .status(500)
        .send({ message: "اتصال با دیتابیس با خطا مواجه شد!" });
    }

    const { fullname, image, phone, email, job } = req.body;

    const isBodyValid = addContactValidation.safeParse({
      fullname,
      image,
      phone,
      email,
      job,
    });

    if (!isBodyValid) {
      await client.close();
      return res.status(400).send({ message: "لطفا تمام فیلد ها را پر کنید!" });
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

    const userEmail = request.body.user.email;

    let findUser: WithId<UserCollectiontype> | null;
    try {
      findUser = await userCollection.findOne({ email: userEmail });
    } catch {
      await client.close();
      return res.status(404).send({ message: "کاربر مورد نظر یافت نشد!" });
    }

    const isUserExisted = findUser?.contacts.find(
      (contact) => contact.fullname === req.body.fullname
    );

    if (isUserExisted) {
      await client.close();
      return res
        .status(400)
        .send({ message: "نام این مخاطب در لیست شما وجود دارد!" });
    }

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

    await client.close();
    return res.send({
      _id: user.value?._id,
      fullname,
      email,
      phone,
      job,
      image,
    });
  }
};

export default handler;
