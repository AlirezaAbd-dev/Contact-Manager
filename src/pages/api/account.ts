import { NextApiRequest, NextApiResponse } from "next";
import deleteAccountController from "../../serveruUtils/controllers/deleteUserController";

export interface CustomDeleteRequest extends NextApiRequest {
  body: {
    email: string;
    password: string;
  };
}

async function accountHandler(req: CustomDeleteRequest, res: NextApiResponse) {
  if (req.method === "PUT") {
    await deleteAccountController(req, res);
  } else {
    return res.status(404).send("404 Not Found");
  }
}

export default accountHandler;
