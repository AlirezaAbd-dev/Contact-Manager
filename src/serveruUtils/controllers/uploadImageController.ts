import { NextApiResponse } from "next";
import formidable from "formidable";
import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

import { CustomNextRequest } from "../../../types";
import verifyToken from "../middleware/verifyToken";
import imageValidation from "../validations/uploadImageValidation";
import createReadStream from "../helpers/createReadStream";
import arvanCloudConnection from "../helpers/arvanCloudConnection";
import UserModel, { UserModelType } from "../models/userModel";

const bucketName = process.env.ARVAN_BUCKET_NAME!;
const imageBaseAddress = process.env.ARVAN_IMAGE_BASE_ADDRESS!;

const UploadImageHandler = async (
  req: CustomNextRequest,
  res: NextApiResponse
) => {
  const _id = req.query._id;

  const form = formidable({ maxFileSize: 1024 * 1024 });

  form.parse(req, async (err, _fields, files) => {
    const validated = await imageValidation(err, res, files);

    if (validated !== null) {
      return res.status(validated.status).json({ message: validated.message });
    }

    let fileFormat: string = "";
    try {
      fileFormat =
        // @ts-ignore
        files?.image?.mimetype === "image/jpeg"
          ? ".jpeg"
          : // @ts-ignore
          files?.image?.mimetype === "image/jpg"
          ? ".jpg"
          : ".png";
    } catch (err) {
      console.log(err);
    }

    const verifiedUser = await verifyToken(req);

    if (!verifiedUser || !verifiedUser.email) {
      return res
        .status(401)
        .json({ message: "شما به این صفحه درسترسی ندارید!" });
    }

    const findUser = await UserModel.findOne<UserModelType>({
      email: verifiedUser.email,
    });

    if (!findUser) {
      return res.status(404).send({ message: "کاربر مورد نظر یافت نشد!" });
    }

    const findContact = findUser.contacts?.find(
      (contact) => contact._id.toString() === _id
    );

    if (!findContact) {
      return res.status(404).send({ message: "مخاطب مورد نظر یافت نشد!" });
    }

    // @ts-ignore
    const fileStream = createReadStream(files.image.filepath, res);

    // S3 Client Object
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
        if (findContact.image)
          try {
            await s3.send(
              new DeleteObjectCommand({
                Bucket: bucketName,
                Key: findContact.image.split("/")[3],
                // VersionId: 'version2.2',
              })
            );
          } catch (err) {
            console.log("Error", err);
          }

        findUser.contacts = findUser.contacts?.map((contact) => {
          if (contact._id.toString() === _id) {
            return { ...contact, image: imageBaseAddress + "/" + fileName };
          } else {
            return contact;
          }
        });

        await findUser.save();

        return res
          .status(200)
          .json({ message: "عکس کاربر با موفقیت بارگذاری شد" });
      }
    } catch (err) {
      console.log("Error", err);
      return res.status(500).json({
        message: "بارگذاری عکس با خطا مواجه شد!",
        errorDetails: err,
      });
    }

    // end of formidable block
  });
};

export default UploadImageHandler;
