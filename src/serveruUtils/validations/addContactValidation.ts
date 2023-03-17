import formidable from "formidable";
import { NextApiResponse } from "next";
import { z } from "zod";
import client from "../databaseClient/client";

export default z.object({
  fullname: z.string().min(3),
  phone: z.string().min(8).max(12),
  email: z.string().email().optional(),
  job: z.string().min(2).optional(),
});

export const uploadImageValidation = async (
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
