import { S3Client } from "@aws-sdk/client-s3";

const accessKey = process.env.ARVAN_ACCESS_KEY!;
const secretKey = process.env.ARVAN_SECRET_KEY!;
const endpoint = process.env.ARVAN_ENDPOINT!;

export default Object.freeze(
  new S3Client({
    region: "default",
    endpoint: endpoint,
    credentials: {
      accessKeyId: accessKey,
      secretAccessKey: secretKey,
    },
  })
);
