import { NextApiResponse } from "next";
import { NextRequest } from "../../../types";
import loginController from "../../serveruUtils/controllers/loginController";

const handler = async (req: NextRequest, res: NextApiResponse) => {
  await loginController(req, res);
};

export default handler;
