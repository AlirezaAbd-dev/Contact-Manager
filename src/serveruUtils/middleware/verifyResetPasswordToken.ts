import jwt from "jsonwebtoken";

import { ChangePasswordRequest } from "../../pages/api/password";

const verifyResetPasswordToken = (req: ChangePasswordRequest) => {
  const token = req.headers["x-password-token"];

  try {
    const user = jwt.verify(token, process.env.JWT_RESET_PASSWORD_SECRET_KEY!);

    // @ts-ignore
    if (user?.duty !== process.env.PASSWORD_DUTY_KEY!) {
      return null;
    }

    return user as { email: string };
  } catch (_) {
    return null;
  }
};

export default verifyResetPasswordToken;
