import { NextApiResponse } from "next";
import { NextRequest } from "../../../types";
import signInController from "../../serveruUtils/controllers/signInController";

const handler = async (req: NextRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    await signInController(req, res);
  } else {
    return res.status(404).send("404 Not Found");
  }
};

export default handler;
