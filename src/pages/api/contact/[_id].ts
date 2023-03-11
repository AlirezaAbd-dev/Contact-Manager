import { NextApiResponse } from "next";

import { CustomAddContactRequest } from "../../../../types";
import deleteContact from "../../../serveruUtils/controllers/deleteContact";
import editContact from "../../../serveruUtils/controllers/editContact";
import singleContact from "../../../serveruUtils/controllers/singleContact";

const handler = async (req: CustomAddContactRequest, res: NextApiResponse) => {
  // Check Request Method
  if (req.method === "GET") {
    await singleContact(req, res);
  }

  // Check Request Method
  if (req.method === "PUT") {
    await editContact(req, res);
  }

  // Check Request Method
  if (req.method === "DELETE") {
    await deleteContact(req, res);
  }
};

export default handler;
