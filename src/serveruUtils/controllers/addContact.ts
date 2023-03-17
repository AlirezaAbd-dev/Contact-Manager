import { PutObjectCommand } from "@aws-sdk/client-s3";
import formidable from "formidable";
import { ObjectId, WithId } from "mongodb";
import { NextApiResponse } from "next";
import { CustomAddContactRequest } from "../../../types";
import userCollection, {
  UserCollectiontype,
} from "../collection/userCollection";
import client from "../databaseClient/client";
import arvanCloudConnection from "../helpers/arvanCloudConnection";
import createReadStream from "../helpers/createReadStream";
import verifyToken from "../middleware/verifyToken";
import addContactValidation, {
  uploadImageValidation,
} from "../validations/addContactValidation";

const bucketName = process.env.ARVAN_BUCKET_NAME!;
const imageBaseAddress = process.env.ARVAN_IMAGE_BASE_ADDRESS!;

const addContact = async (
  req: CustomAddContactRequest,
  res: NextApiResponse
) => {
  // Database Connection
  try {
    await client.connect();
  } catch (err) {
    return res
      .status(500)
      .send({ message: "اتصال با دیتابیس با خطا مواجه شد!" });
  }

  const form = formidable({ maxFileSize: 1024 * 1024 });

  form.parse(req, async (err, fields, files) => {
    const { fullname, email, phone, job } = fields as {
      fullname: string;
      email: string;
      phone: string;
      job: string;
    };

    // Validate Request Body
    const isBodyValid = addContactValidation.safeParse({
      fullname,
      phone,
      email,
      job,
    });

    if (files.image) {
      await uploadImageValidation(err, res, files);
    }

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
      (contact) => contact.fullname === fullname
    );

    if (isUserExisted) {
      await client.close();
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
        await client.close();
        console.log("Error", err);
        return res.status(500).json({
          message: "بارگذاری عکس با خطا مواجه شد!",
          errorDetails: err,
        });
      }
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
            image: imageAddress,
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
      image: imageAddress,
    });
  });
};

export default addContact;
