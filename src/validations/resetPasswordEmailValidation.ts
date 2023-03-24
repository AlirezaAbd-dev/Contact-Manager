import { z } from "zod";

export default z.object({
  email: z
    .string({ required_error: "لطفا فیلد ایمیل را خالی نگذارید!" })
    .email({ message: "لطفا از یک ایمیل معتبر استفاده نمایید!" }),
});
