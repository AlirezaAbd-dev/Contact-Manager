import { z } from "zod";

export default z.object({
  email: z
    .string({ required_error: "لطفا فیلد ایمیل را خالی نگذارید!" })
    .email({ message: "لطفا از ایمیل معتبر استفاده کنید!" }),
  password: z
    .string({ required_error: "لطفا فیلد رمز عبور را پر کنید!" })
    .min(8, "رمز عبور باید بیشتر از 8 کاراکتر باشد!"),
});
