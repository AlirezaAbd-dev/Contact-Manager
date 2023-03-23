import jwt, { JwtPayload } from "jsonwebtoken";

import { CustomNextRequest } from "../../../types";
import userCollection from "../collection/userCollection";
import client from "../databaseClient/client";

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
    await client.connect();

    if (user.email) {
      const findUser = await userCollection.findOne({ email: user?.email });

      if (!findUser) {
        return null;
      }

      if (findUser.resetPassAmount > user.resetPassAmount) {
        return null;
      }
    }
  } catch (err) {
    await client.close();
    console.log(err);
    return null;
  }

  if (user) {
    return user as { email: string };
  }

  return null;
}
