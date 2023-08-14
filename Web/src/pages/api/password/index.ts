import { NextApiRequest, NextApiResponse } from "next";

import changePasswordController from "../../../serveruUtils/controllers/changePasswordController";
import resetPasswordController from "../../../serveruUtils/controllers/resetPasswordController";

export interface ChangePasswordRequest extends NextApiRequest {
  body: {
    email: string;
    password: string;
    url: string;
  };
  headers: {
    "x-password-token": string;
  };
}

const handler = async (req: ChangePasswordRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    await resetPasswordController(req, res);
  } else if (req.method === "PUT") {
    await changePasswordController(req, res);
  } else {
    return res.status(404).send("404 Not Found");
  }
};

export default handler;
