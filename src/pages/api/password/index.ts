import { NextApiRequest, NextApiResponse } from "next";

import resetPasswordController from "../../../serveruUtils/controllers/resetPasswordController";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    await resetPasswordController(req, res);
  } else {
    return res.status(404).send("404 Not Found");
  }
};

export default handler;
