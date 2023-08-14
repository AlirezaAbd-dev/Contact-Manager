import { NextApiResponse } from "next";
import { CustomAddContactRequest } from "../../../types";
import verifyToken from "../middleware/verifyToken";
import UserModel, { UserModelType } from "../models/userModel";
import addContactValidation from "../validations/addContactValidation";

const editContact = async (
  req: CustomAddContactRequest,
  res: NextApiResponse
) => {
  // Getting Queries From URL
  const contactId = req.query._id;

  const { fullname, phone, email, job } = req.body;

  // Validate Request Body
  const isBodyValid = addContactValidation.safeParse({
    fullname,
    phone,
    email,
    job,
  });

  if (!isBodyValid.success) {
    return res.status(400).send({ message: "لطفا تمام فیلد ها را پر کنید!" });
  }

  // Validate Request JsonWebToken
  const verifiedUser = await verifyToken(req);

  if (!verifiedUser || !verifiedUser.email) {
    return res.status(401).send({ message: "شما به این صفحه درسترسی ندارید!" });
  }

  const userEmail = verifiedUser.email;

  // Finding User From Database
  const findUser = await UserModel.findOne<UserModelType>({ email: userEmail });

  if (!findUser) {
    return res.status(404).send({ message: "کاربر مورد نظر یافت نشد!" });
  }

  // Filtering Out Current Contact For Avoiding Conflict
  const popUserout = findUser?.contacts?.filter(
    (contact) => contact._id.toString() !== contactId
  );
  // Checking If There Is Another Contact With The Same Name? Then Return It To Variable And Sending 404 As Response
  const isUserExisted = popUserout?.find(
    (contact) => contact.fullname === fullname
  );

  if (isUserExisted) {
    return res
      .status(404)
      .send({ message: "نام این مخاطب در لیست شما وجود دارد!" });
  }

  const image = findUser?.contacts?.find(
    (contact) => contact._id.toString() === contactId
  )?.image;

  // Update Chosen Contact To New Values
  findUser.contacts = findUser.contacts?.map((contact) => {
    if (contact._id.toString() === contactId) {
      return {
        _id: contact._id,
        fullname,
        job,
        image,
        phone,
        email,
      };
    } else {
      return contact;
    }
  });

  await findUser.save();

  // Sending New Edited Contact As Response
  return res.send({
    _id: contactId?.toString(),
    fullname,
    email,
    phone,
    job,
    image,
  });
};

export default editContact;
