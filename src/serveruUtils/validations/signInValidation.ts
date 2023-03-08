import z from "zod";

export default z.object({
  email: z
    .string({
      required_error: "پر کردن فیلد ایمیل اجباری است!",
    })
    .email({ message: "لطفا فیلد ایمیل را به درستی پر کنید!" }),
  password: z
    .string({
      required_error: "پر کردن فیلد رمز عبور اجباری است!",
    })
    .min(8),
});
