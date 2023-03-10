import { z } from "zod";

export default z.object({
  fullname: z.string().min(3),
  image: z.string().url(),
  phone: z.string().min(8).max(12),
  email: z.string().email(),
  job: z.string().min(2),
});
