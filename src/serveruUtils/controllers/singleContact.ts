import { NextApiResponse } from "next";
import { CustomAddContactRequest } from "../../../types";
import verifyToken from "../middleware/verifyToken";
import UserModel, { UserModelType } from "../models/userModel";

const singleContact = async (
  req: CustomAddContactRequest,
  res: NextApiResponse
) => {
  // Getting Queries From URL
  const contactId = req.query._id;

  // Validate Request JsonWebToken
  const verifiedUser = await verifyToken(req);

  if (!verifiedUser || !verifiedUser.email) {
    return res.status(401).send({ message: "شما به این صفحه درسترسی ندارید!" });
  }

  const userEmail = verifiedUser.email;

  // Finding User In Database
  const findUser = await UserModel.findOne<UserModelType>({
    email: userEmail,
  });

  if (!findUser) {
    return res.status(404).send({ message: "کاربر مورد نظر یافت نشد!" });
  }

  // Find Specific Contact Form Contacts
  const contact = findUser?.contacts?.find(
    (contact) => contact._id.toString() === contactId
  );

  if (!contact) {
    return res.status(404).send({ message: "مخاطب مورد نظر یافت نشد!" });
  }

  // Send Contact As Response
  res.status(202).send({ contact });
};

export default singleContact;
