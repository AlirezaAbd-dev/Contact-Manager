import { NextApiResponse } from "next";
import { NextRequest } from "../../../types";
import loginController from "../../serveruUtils/controllers/loginController";

const handler = async (req: NextRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    await loginController(req, res);
  } else {
    return res.status(404).send("404 Not Found");
  }
};

export default handler;
