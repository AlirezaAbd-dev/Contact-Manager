import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { NextApiResponse } from "next";
import { CustomAddContactRequest } from "../../../types";
import dbConnect from "../database/dbConnect";
import arvanCloudConnection from "../helpers/arvanCloudConnection";
import verifyToken from "../middleware/verifyToken";
import UserModel, { UserModelType } from "../models/userModel";

const deleteContact = async (
  req: CustomAddContactRequest,
  res: NextApiResponse
) => {
  // Getting Queries From URL
  const id = req.query._id;

  // Database Connection
  await dbConnect();

  // Validate Request JsonWebToken
  const verifiedUser = await verifyToken(req);

  if (!verifiedUser || !verifiedUser.email) {
    return res.status(401).send({ message: "شما به این صفحه درسترسی ندارید!" });
  }

  const userEmail = verifiedUser.email;

  const user = await UserModel.findOne<UserModelType>({ email: userEmail });

  let userImageURL: string | undefined = "";
  if (user) {
    userImageURL = user.contacts?.find(
      (contact) => contact._id.toString() === id
    )?.image;
  } else {
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
  user.contacts = user.contacts?.filter(
    (contact) => contact._id.toString() !== id
  );
  await user.save();

  // Sending Success Message As Response
  return res.status(200).send({ message: "مخاطب با موفقیت حذف شد." });
};

export default deleteContact;
