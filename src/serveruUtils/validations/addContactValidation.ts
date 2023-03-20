import formidable from "formidable";
import { z } from "zod";

export default z.object({
  fullname: z.string().min(3),
  phone: z.string().min(8).max(12),
  email: z.string().email().optional(),
  job: z.string().min(2).optional(),
});

export const uploadImageValidation = async (
  files: formidable.Files
) => {

  if (
    // @ts-ignore
    files.image.mimetype !== "image/jpeg" &&
    // @ts-ignore
    files.image.mimetype !== "image/png" &&
    // @ts-ignore
    files.image.mimetype !== "image/jpg"
  ) {
    return {
      statusCode: 400,
      message: "لطفا فایل عکس را با فرمت درست وارد نمایید!",
    };
  }

  return null;
};
