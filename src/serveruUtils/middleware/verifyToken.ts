import jwt from "jsonwebtoken";

import { CustomNextRequest } from "../../../types";
import dbConnect from "../database/dbConnect";
import UserModel, { UserModelType } from "../models/userModel";

export default async function (req: CustomNextRequest) {
  const jwtSecret = process.env.JWT_SECRET_KEY!;

  const token = req.headers["x-authentication-token"];

  let user: any;
  try {
    user = jwt.verify(token, jwtSecret);
  } catch (err) {
    return null;
  }

  try {
    await dbConnect();

    if (user.email) {
      const findUser = await UserModel.findOne<UserModelType>({
        email: user.email,
      });

      if (!findUser || findUser.resetPassAmount > +user.resetPassAmount) {
        return null;
      }
    }
  } catch (err) {
    console.log(err);
    return null;
  }

  if (user) {
    return user as { email: string };
  }

  return null;
}
