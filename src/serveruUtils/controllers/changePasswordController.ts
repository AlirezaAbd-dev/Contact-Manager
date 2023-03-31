import { NextApiResponse } from "next";
import bcrypt from "bcrypt";

import { ChangePasswordRequest } from "../../pages/api/password";
import verifyResetPasswordToken from "../middleware/verifyResetPasswordToken";
import changePasswordValidation from "../validations/changePasswordValidation";
import dbConnect from "../database/dbConnect";
import UserModel from "../models/userModel";

const handler = async (req: ChangePasswordRequest, res: NextApiResponse) => {
  const verifiedUser = verifyResetPasswordToken(req);

  if (!verifiedUser?.email) {
    return res.status(403).json({ message: "شما به این بخش دسترسی ندارید!" });
  }

  const validatedBody = changePasswordValidation.safeParse(req.body);

  if (!validatedBody.success) {
    res.status(400).json({ message: validatedBody.error.issues[0].message });
  }

  const { password: newPassword } = req.body;

  await dbConnect();

  const findUser = await UserModel.findOne({ email: verifiedUser.email });

  if (!findUser || !findUser?._id) {
    return res.status(404).json({ message: "کاربر مورد نظر یافت نشد!" });
  }

  let hashedPassword: string = "";
  try {
    hashedPassword = await bcrypt.hash(newPassword, +process.env.SALT!);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "خطایی در سرور رخ داد!" });
  }

  if (hashedPassword !== "") {
    findUser.resetPassAmount += 1;
    findUser.password = hashedPassword;

    const result = await findUser.save();

    return res
      .status(200)
      .json({ message: "رمز عبور شما با موفقیت تغییر پیدا کرد", result });
  }
};

export default handler;
