import { ObjectId, WithId } from "mongodb";
import { NextApiResponse } from "next";

import { CustomAddContactRequest } from "../../../../types";
import userCollection, {
  UserCollectiontype,
} from "../../../serveruUtils/collection/userCollection";
import addContact from "../../../serveruUtils/controllers/addContact";
import client from "../../../serveruUtils/databaseClient/client";
import verifyToken from "../../../serveruUtils/middleware/verifyToken";
import addContactValidation from "../../../serveruUtils/validations/addContactValidation";

const handler = async (req: CustomAddContactRequest, res: NextApiResponse) => {
  // Check Request Method
  if (req.method === "POST") {
    await addContact(req, res);
  } else {
    // req.method !== "POST"
    await client.close();
    return res.status(404).send("404 Not Found");
  }
};

export default handler;
