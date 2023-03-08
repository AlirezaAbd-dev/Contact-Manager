import { NextApiRequest, NextApiResponse } from "next";
import userCollection from "../../../serveruUtils/collection/userCollection";
import verifyToken from "../../../serveruUtils/middleware/verifyToken";

export interface CustomNextRequest extends NextApiRequest {
  headers: {
    "x-authentication-token": string;
  };
  body: {
    user: {
      email: string;
    };
  };
}

const handler = async (req: CustomNextRequest, res: NextApiResponse) => {
  let request: CustomNextRequest;
  try {
    request = verifyToken(req);
  } catch (err) {
    return res.status(500).send({ message: "شما به این صفحه درسترسی ندارید!" });
  }

  const userEmail = request.body.user.email;

  const user = await userCollection.findOne({ email: userEmail });
  if (!user)
    return res.status(404).send({ message: "کاربر مورد نظر یافت نشد!" });

  return res.status(200).send({ contacts: user.contacts });
};

export default handler;
