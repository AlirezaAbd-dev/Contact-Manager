import { NextApiResponse } from "next";
import bcrypt from "bcrypt";

import { CustomDeleteRequest } from "../../pages/api/account";
import signInValidation from "../validations/signInValidation";
import dbConnect from "../database/dbConnect";
import UserModel, { UserModelType } from "../models/userModel";

const deleteAccountController = async (
  req: CustomDeleteRequest,
  res: NextApiResponse
) => {
  // Database Connection
  await dbConnect();

  // Validating Request Body
  const validatedBody = signInValidation.safeParse(req.body);

  if (!validatedBody.success) {
    return res
      .status(400)
      .json({ message: validatedBody.error.issues[0].message });
  }

  const findUser = await UserModel.findOne<UserModelType>({
    email: req.body.email,
  });

  if (!findUser) {
    return res
      .status(403)
      .json({ message: "نام کاربری یا رمز عبور اشتباه است!" });
  }

  const comparedPassword = await bcrypt.compare(
    req.body.password,
    findUser.password
  );

  if (!comparedPassword) {
    return res.json({ message: "نام کاربری یا رمز عبور اشتباه است!" });
  }

  await UserModel.deleteOne({
    email: req.body.email,
  });

  return res.status(200).json({ message: "حساب شما با موفقیت حذف شد!" });
};

export default deleteAccountController;
