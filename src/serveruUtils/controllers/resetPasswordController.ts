import { NextApiRequest, NextApiResponse } from "next";
import resetPasswordValidation from "../validations/resetPasswordValidation";

interface ResetPasswordRequest extends NextApiRequest {
  body: {
    email: string;
    url?: string;
  };
}

const resetPasswordController = async (
  req: ResetPasswordRequest,
  res: NextApiResponse
) => {
  const validatedBody = resetPasswordValidation.safeParse(req.body);

  if (!validatedBody.success) {
    res.status(400).json({ message: validatedBody.error.issues[0].message });
  }

  
};

export default resetPasswordController;
