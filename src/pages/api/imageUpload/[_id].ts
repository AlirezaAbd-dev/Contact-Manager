import { NextApiResponse } from "next";

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
