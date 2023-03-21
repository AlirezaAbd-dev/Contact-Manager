import { z } from "zod";

export default z.object({
  email: z
    .string({
      required_error: "پر کردن فیلد ایمیل اجباری است!",
    })
    .email({ message: "لطفا از یک ایمیل معتبر استفاده کنید!" }),
  url: z
    .string()
    .url({ message: "لطفا آدرس را به درستی وارد نمایید!" })
    .optional(),
});
