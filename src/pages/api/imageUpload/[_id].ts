import { NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import formidable from "formidable";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import fs from "fs";

import client from "../../../serveruUtils/databaseClient/client";
import userCollection from "../../../serveruUtils/collection/userCollection";
import verifyToken from "../../../serveruUtils/middleware/verifyToken";
import { CustomNextRequest } from "../../../../types";
import UploadImageHandler from "../../../serveruUtils/controllers/uploadImageController";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req: CustomNextRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    await UploadImageHandler(req, res);
  } else {
    return res.status(404).send("404 Not Found");
  }
};

export default handler;
