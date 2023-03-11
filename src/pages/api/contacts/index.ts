import { NextApiResponse } from "next";

import { CustomNextRequest } from "../../../../types";
import contacts from "../../../serveruUtils/controllers/contacts";
import client from "../../../serveruUtils/databaseClient/client";

const handler = async (req: CustomNextRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    await contacts(req, res);
  } else {
    return res.status(404).send("404 Not Found");
  }
};

export default handler;
