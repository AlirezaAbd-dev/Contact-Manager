import { NextApiResponse } from "next";
import bcrypt from "bcrypt";

import { ChangePasswordRequest } from "../../pages/api/password";
import userCollection, {
  UserCollectiontype,
} from "../collection/userCollection";
import client from "../databaseClient/client";
import verifyResetPasswordToken from "../middleware/verifyResetPasswordToken";
import changePasswordValidation from "../validations/changePasswordValidation";
import { WithId } from "mongodb";

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

  try {
    await client.connect();
  } catch (err) {
    await client.close();
    console.log(err);
    return res
      .status(500)
      .json({ message: "اتصال با دیتابیس با خطا مواجه شد!" });
  }

  let findUser: WithId<UserCollectiontype> | null;
  try {
    findUser = await userCollection.findOne({
      email: verifiedUser?.email,
    });

    if (!findUser?._id) {
      await client.close();
      return res.status(404).json({ message: "کاربر مورد نظر یافت نشد!" });
    }
  } catch (err) {
    await client.close();
    console.log(err);
    return res.status(500).json({ message: "تغییر رمز عبور با خطا مواجه شد!" });
  }

  let hashedPassword: string = "";
  try {
    hashedPassword = await bcrypt.hash(newPassword, +process.env.SALT!);
  } catch (err) {
    await client.close();
    console.log(err);
    return res.status(500).json({ message: "خطایی در سرور رخ داد!" });
  }

  try {
    if (hashedPassword !== "" || !hashedPassword) {
      await userCollection.updateOne(
        { email: verifiedUser?.email },
        {
          $set: {
            resetPassAmount: +findUser.resetPassAmount++,
            password: hashedPassword,
          },
        }
      );

      return res
        .status(200)
        .json({ message: "رمز عبور شما با موفقیت تغییر پیدا کرد" });
    }
  } catch (err) {
    await client.close();
    console.log(err);
    return res.status(500).json({ message: "تغییر رمز عبور با خطا مواجه شد!" });
  }
};

export default handler;
