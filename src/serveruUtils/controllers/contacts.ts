import { NextApiResponse } from "next";
import { CustomNextRequest } from "../../../types";
import dbConnect from "../database/dbConnect";
import verifyToken from "../middleware/verifyToken";
import UserModel, { UserModelType } from "../models/userModel";

const contacts = async (req: CustomNextRequest, res: NextApiResponse) => {
  // Database Connection
  await dbConnect();

  // Getting Queries From URL
  const search = req.query.search || "false";
  const page = req.query.page;

  // Validate Request JsonWebToken
  const verifiedUser = await verifyToken(req);

  if (!verifiedUser || !verifiedUser.email) {
    return res.status(401).json({ message: "شما به این صفحه درسترسی ندارید!" });
  }

  const userEmail = verifiedUser.email;

  // Find User In Database
  const user = await UserModel.findOne<UserModelType>({ email: userEmail });
  if (!user) {
    return res.status(404).send({ message: "کاربر مورد نظر یافت نشد!" });
  }

  // Check If There Is Page Query In URL Or Not
  if (page === "0" || !page || isNaN(+page)) {
    // If There Isn't page Query Then Return All Data
    if (search !== "true") {
      return res.status(200).send({ contacts: user.contacts });
    } else {
      // If There Is Search Query Equal To True Then Just Return Data For Search
      return res.status(200).send({
        contacts: user?.contacts?.map((contact) => ({
          _id: contact._id,
          fullname: contact.fullname,
        })),
      });
    }
  } else {
    // If There Is Page Query Then Do The Procces For Pagination
    const numberOfItemInEveryPage = 12;
    const amountOfPages = Math.ceil(
      (user?.contacts?.length || 0) / numberOfItemInEveryPage
    );

    const paginatedContacts = user.contacts?.slice(
      (+page - 1) * numberOfItemInEveryPage,
      numberOfItemInEveryPage * +page
    );

    // Sending Paginated Data As Response
    return res
      .status(200)
      .send({ contacts: paginatedContacts, pagesNumber: amountOfPages });
  }
};

export default contacts;
