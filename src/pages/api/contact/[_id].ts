import { NextApiResponse } from "next";

import { CustomAddContactRequest } from "../../../../types";
import deleteContact from "../../../serveruUtils/controllers/deleteContact";
import editContact from "../../../serveruUtils/controllers/editContact";
import singleContact from "../../../serveruUtils/controllers/singleContact";

const handler = async (req: CustomAddContactRequest, res: NextApiResponse) => {
  // GET
  if (req.method === "GET") {
    await singleContact(req, res);
  }

  // PUT
  else if (req.method === "PUT") {
    await editContact(req, res);
  }

  // DELETE
  else if (req.method === "DELETE") {
    await deleteContact(req, res);
  } else {
    return res.status(404).send("404 Not Found");
  }
};

export default handler;
