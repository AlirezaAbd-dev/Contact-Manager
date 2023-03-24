import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { ObjectId } from "mongodb";
import { NextApiResponse } from "next";
import { CustomAddContactRequest } from "../../../types";
import userCollection from "../collection/userCollection";
import client from "../databaseClient/client";
import arvanCloudConnection from "../helpers/arvanCloudConnection";
import verifyToken from "../middleware/verifyToken";

const deleteContact = async (
  req: CustomAddContactRequest,
  res: NextApiResponse
) => {
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
  const verifiedUser = await verifyToken(req);

  if (!verifiedUser || !verifiedUser.email) {
    await client.close();
    return res.status(401).send({ message: "شما به این صفحه درسترسی ندارید!" });
  }

  const userEmail = verifiedUser.email;

  const user = await userCollection.findOne({ email: userEmail });

  let userImageURL: string | undefined = "";
  if (user) {
    userImageURL = user.contacts.find(
      (contact) => contact._id.toString() === id
    )?.image;
  } else {
    await client.close();
    return res.status(404).send({ message: "مخاطب مورد نظر یافت نشد!" });
  }

  if (userImageURL) {
    const s3 = arvanCloudConnection;
    const imageKey = userImageURL.split("/")[3];
    try {
      await s3.send(
        new DeleteObjectCommand({
          Bucket: process.env.ARVAN_BUCKET_NAME!,
          Key: imageKey,
        })
      );
    } catch (err) {
      console.log("Error", err);
    }
  }

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
};

export default deleteContact;
