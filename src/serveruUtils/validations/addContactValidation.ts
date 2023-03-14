import { z } from "zod";

export default z.object({
  fullname: z.string().min(3),
  image: z.string().url().optional(),
  phone: z.string().min(8).max(12),
  email: z.string().email().optional(),
  job: z.string().min(2).optional(),
});
