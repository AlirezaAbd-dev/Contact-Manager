import { NextApiResponse } from "next";
import bcrypt from "bcrypt";

import { CustomDeleteRequest } from "../../pages/api/account";
import userCollection from "../collection/userCollection";
import client from "../databaseClient/client";
import signInValidation from "../validations/signInValidation";

const deleteAccountController = async (
  req: CustomDeleteRequest,
  res: NextApiResponse
) => {
  // Database Connection
  try {
    await client.connect();
  } catch (err) {
    return res
      .status(500)
      .send({ message: "اتصال با دیتابیس با خطا مواجه شد!" });
  }

  // Validating Request Body
  const validatedBody = signInValidation.safeParse(req.body);

  if (!validatedBody.success) {
    return res
      .status(400)
      .json({ message: validatedBody.error.issues[0].message });
  }

  const findUser = await userCollection.findOne({ email: req.body.email });

  if (!findUser) {
    await client.close();
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

  const result = await userCollection.findOneAndDelete({
    email: req.body.email,
  });

  await client.close();

  if (!result.ok) {
    return res.status(500).json({ message: "خطایی در سرور رخ داد!" });
  }

  return res.status(200).json({ message: "حساب شما با موفقیت حذف شد!" });
};

export default deleteAccountController;
