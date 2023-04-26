declare namespace NodeJS {
  interface ProcessEnv {
    MONGODB_URI: string;
    SALT: string;
    JWT_SECRET_KEY: string;
    JWT_RESET_PASSWORD_SECRET_KEY: string;
    PASSWORD_DUTY_KEY: string;
    ARVAN_ACCESS_KEY: string;
    ARVAN_SECRET_KEY: string;
    ARVAN_ENDPOINT: string;
    ARVAN_BUCKET_NAME: string;
    ARVAN_IMAGE_BASE_ADDRESS: string;
    EMAIL_ADDRESS: string;
    EMAIL_PASSWORD: string;
    NEXT_PUBLIC_API_URL: string;
  }
}
