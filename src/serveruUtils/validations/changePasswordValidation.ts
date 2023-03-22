import { z } from "zod";

export default z.object({
  password: z
    .string({
      required_error: "لطفا فیلد رمز عبور را پر کنید!",
      invalid_type_error: "لطفا مقدار رمز عبور را به صورت رشته وارد نمایید!",
    })
    .min(8, { message: "مقدار رمز عبور باید بیشتر از 8 کاراکتر باشد!" }),
});
