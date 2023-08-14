import { z } from "zod";

const envSchema = z.object({
  MONGODB_URI: z.string(),
  SALT: z.string(),
  JWT_SECRET_KEY: z.string(),
  JWT_RESET_PASSWORD_SECRET_KEY: z.string(),
  PASSWORD_DUTY_KEY: z.string(),
  ARVAN_ACCESS_KEY: z.string(),
  ARVAN_SECRET_KEY: z.string(),
  ARVAN_ENDPOINT: z.string(),
  ARVAN_BUCKET_NAME: z.string(),
  ARVAN_IMAGE_BASE_ADDRESS: z.string(),
  EMAIL_ADDRESS: z.string(),
  EMAIL_PASSWORD: z.string(),
  NEXT_PUBLIC_API_URL: z.string(),
});

export default envSchema;
