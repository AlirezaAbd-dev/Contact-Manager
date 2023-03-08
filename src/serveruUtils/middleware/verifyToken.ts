import { CustomNextRequest } from "../../pages/api/contacts";
import jwt from "jsonwebtoken";

export default function (req: CustomNextRequest) {
  const jwtSecret = process.env.JWT_SECRET_KEY!;

  const token = req.headers["x-authentication-token"];

  const user = jwt.verify(token, jwtSecret);

  if (!user) throw new Error("شما به این صفحه درسترسی ندارید!");

  req.body.user = user as { email: string };

  return req;
}
