import { z } from "zod";

export default z.object({
  email: z
    .string({ required_error: "لطفا فیلد ایمیل را خالی نگذارید!" })
    .email({ message: "لطفا از یک ایمیل معتبر استفاده نمایید!" }),
});

export const changePasswordValidation = z
  .object({
    password: z
      .string({ required_error: "لطفا فیلد رمز عبور را پر کنید!" })
      .min(8, { message: "رمز عبور باید بیشتر از 8 کاراکتر باشد!" }),
    confirmPassword: z
      .string({ required_error: "لطفا فیلد رمز عبور را پر کنید!" })
      .min(8, { message: "رمز عبور باید بیشتر از 8 کاراکتر باشد!" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "رمز عبور و تکرار رمز عبور باید یکسان باشند!",
    path: ["confirmPassword"],
  });
