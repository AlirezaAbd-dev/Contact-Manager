import formidable from "formidable";
import { NextApiResponse } from "next";
import client from "../databaseClient/client";

const imageValidation = async (
  err: any,
  res: NextApiResponse,
  files: formidable.Files
) => {
  if (err?.httpCode === 413) {
    await client.close();
    return res
      .status(413)
      .json({ message: "حجم عکس باید کمتر از 1 مگابایت باشد!" });
  }

  if (!files.image) {
    await client.close();
    return res
      .status(400)
      .json({ message: "لطفا مقادیر را به درستی وارد نمایید!" });
  }

  if (
    // @ts-ignore
    files.image.mimetype !== "image/jpeg" &&
    // @ts-ignore
    files.image.mimetype !== "image/png" &&
    // @ts-ignore
    files.image.mimetype !== "image/jpg"
  ) {
    await client.close();
    return res
      .status(400)
      .json({ message: "لطفا فایل عکس را با فرمت درست وارد نمایید!" });
  }
};

export default imageValidation;
