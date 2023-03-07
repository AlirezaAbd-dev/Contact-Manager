import z from "zod";

export default z.object({
  email: z
    .string({
      required_error: "email feild is required!",
    })
    .email({ message: "لطفا فیلد ایمیل را به درستی پر کنید!" }),
  password: z
    .string({
      required_error: "password feild is required!",
    })
    .min(8),
});
