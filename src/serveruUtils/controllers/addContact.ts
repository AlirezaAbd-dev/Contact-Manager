import { PutObjectCommand } from "@aws-sdk/client-s3";
import formidable from "formidable";
import { NextApiResponse } from "next";

import { CustomAddContactRequest } from "../../../types";
import arvanCloudConnection from "../helpers/arvanCloudConnection";
import createReadStream from "../helpers/createReadStream";
import verifyToken from "../middleware/verifyToken";
import addContactValidation, {
  uploadImageValidation,
} from "../validations/addContactValidation";
import UserModel, { UserModelType } from "../models/userModel";
import mongoose from "mongoose";

const bucketName = process.env.ARVAN_BUCKET_NAME!;
const imageBaseAddress = process.env.ARVAN_IMAGE_BASE_ADDRESS!;

const addContact = async (
  req: CustomAddContactRequest,
  res: NextApiResponse
) => {
  const form = formidable({ maxFileSize: 1024 * 1024 });

  form.parse(req, async (err, fields, files) => {
    const { fullname, email, phone, job } = fields as {
      fullname: string;
      email: string;
      phone: string;
      job: string;
    };

    if (err?.httpCode === 413) {
      return res
        .status(413)
        .json({ message: "حجم عکس باید کمتر از 1 مگابایت باشد!" });
    }

    if (files.image) {
      const validatedImage = await uploadImageValidation(files);

      if (validatedImage) {
        return res
          .status(validatedImage.statusCode)
          .send({ message: validatedImage.message });
      }
    }

    // Validate Request Body
    const isBodyValid = addContactValidation.safeParse({
      fullname,
      phone,
      email,
      job,
    });

    if (!isBodyValid.success) {
      return res
        .status(400)
        .send({ message: "لطفا تمام فیلد ها را به درستی وارد کنید!" });
    }

    // Validate Request JsonWebToken
    const verifiedUser = await verifyToken(req);

    if (!verifiedUser || !verifiedUser.email) {
      return res
        .status(401)
        .send({ message: "شما به این صفحه درسترسی ندارید!" });
    }

    const userEmail = verifiedUser.email;

    // Finding User From Database

    const findUser = await UserModel.findOne<UserModelType>({
      email: userEmail,
    }).catch(() => {
      return res.status(404).send({ message: "کاربر مورد نظر یافت نشد!" });
    });

    if (!findUser) {
      return res.status(404).send({ message: "کاربر مورد نظر یافت نشد!" });
    }

    // Checking If Contact Exists Then Client Should Use Another fullname Value Or Continue
    const isUserExisted = findUser?.contacts?.find(
      (contact) => contact.fullname === fullname
    );

    if (isUserExisted) {
      return res
        .status(400)
        .send({ message: "نام این مخاطب در لیست شما وجود دارد!" });
    }

    let imageAddress = "";

    if (files.image) {
      const fileFormat =
        // @ts-ignore
        files.image.mimetype === "image/jpeg"
          ? ".jpeg"
          : // @ts-ignore
          files.image.mimetype === "image/jpg"
          ? ".jpg"
          : ".png";

      // @ts-ignore
      const fileStream = createReadStream(files.image.filepath, res);

      const s3 = arvanCloudConnection;

      // @ts-ignore
      const fileName = files.image.newFilename + fileFormat;

      const uploadParams = {
        Bucket: bucketName, // bucket name
        // @ts-ignore
        Key: fileName, // the name of the selected file
        ACL: "public-read", // 'private' | 'public-read',
        Body: fileStream,
      };

      try {
        const data = await s3.send(new PutObjectCommand(uploadParams));
        if (data.$metadata.httpStatusCode === 200) {
          imageAddress = imageBaseAddress + "/" + fileName;
        }
      } catch (err) {
        console.log("Error", err);
        return res.status(500).json({
          message: "بارگذاری عکس با خطا مواجه شد!",
          errorDetails: err,
        });
      }
    }
    // Add Contact To Contacts
    findUser?.contacts?.push({
      _id: new mongoose.Types.ObjectId(),
      fullname,
      email,
      phone,
      job,
      image: imageAddress,
    });

    const result = await findUser.save();

    return res
      .status(200)
      .send(result.contacts && result?.contacts[result.contacts?.length - 1]);
  });
};

export default addContact;
