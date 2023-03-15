import { z } from "zod";

export default z.object({
  fullname: z
    .string({ required_error: "لطفا فیلد نام و نام خانوادگی را پر کنید!" })
    .min(3),
  email: z
    .string()
    .email({ message: "لطفا از آدرس ایمیل معتبر استفاده کنید!" })
    .optional(),
  job: z.string().min(3).optional(),
  phone: z
    .number({
      required_error: "لطفا فیلد شماره ی تلفن را پر کنید!",
      invalid_type_error: "لطفا شماره تلفن را به درستی وارد نمایید!!",
    })
    .min(8, {
      message: "شماره تلفن باید حداقل 8 کاراکتر باشد!",
    }),
  image: z
    .string()
    .url({ message: "لطفا آدرس تصویر را به درستی وارد نمایید!" })
    .optional(),
});
