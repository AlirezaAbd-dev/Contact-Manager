import { NextApiResponse } from "next";

import { CustomAddContactRequest } from "../../../../types";
import addContact from "../../../serveruUtils/controllers/addContact";

const handler = async (req: CustomAddContactRequest, res: NextApiResponse) => {
  // Check Request Method
  if (req.method === "POST") {
    await addContact(req, res);
  } else {
    return res.status(404).send("404 Not Found");
  }
};

export default handler;
