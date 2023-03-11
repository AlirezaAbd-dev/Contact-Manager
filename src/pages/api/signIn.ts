import { NextApiResponse } from "next";
import { NextRequest } from "../../../types";
import signInController from "../../serveruUtils/controllers/signInController";

const handler = async (req: NextRequest, res: NextApiResponse) => {
  await signInController(req, res);
};

export default handler;
