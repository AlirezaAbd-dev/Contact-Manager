import jwt, { JwtPayload } from "jsonwebtoken";

import { CustomNextRequest } from "../../../types";

export default function (req: CustomNextRequest) {
  const jwtSecret = process.env.JWT_SECRET_KEY!;

  const token = req.headers["x-authentication-token"];

  let user: string | JwtPayload;
  try {
    user = jwt.verify(token, jwtSecret);
  } catch (err) {
    return null;
  }

  if (user) {
    return user as { email: string };
  }

  return null;
}
