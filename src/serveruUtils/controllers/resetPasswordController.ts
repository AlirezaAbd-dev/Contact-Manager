import { NextApiRequest, NextApiResponse } from "next";

import resetPasswordValidation from "../validations/resetPasswordValidation";
import nodemailer from "nodemailer";

import contactManagerLogo from "../../assets/contact-manager-logo.png";

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

  const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS!;

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD!,
    },
  });

  const HTML = `<section style='direction: rtl; padding: 20px; background-color: #282a36'; color: #fff; border-radius: 25px;'>
    <center>
      <img src='${contactManagerLogo}' alt='logo' />
    </center>
    <h1 style='text-align: center; font-weight: bold;'>
      سلام کاربر عزیز 🌹
    </h1>
    <br />
    <h4>
      از این که وبسایت ما را برای ذخیره مخاطبین خود انتخاب کرده اید بسیار سپاس گذاریم 🙏🙏
    </h4>
    <br />
    <p>
      برای تغییر رمز عبور خود فقط کافیست روی دکمه ی زیر کلیک کنید و رمز جدید خود را وارد نمایید 👇👇
    </p>
    <br />
    <center>
      <a href='${req.body.url}' style='padding: 7px 15px 7px 15px; border-radius: 20px; background-color: #BD93F9; color: #000; font-size: 18px; font-weight: bold;'>
        تغییر رمز عبور
      </a>
    </center>
  </section>`;

  let mailOptions = {
    from: EMAIL_ADDRESS,
    to: req.body.email,
    subject: "تغییر رمز عبور",
    html: HTML,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err.message);

      return res.send(err);
    }
    res.status(200).send({ message: "message sent: %s" + info.messageId });
  });

  // console.log(req.headers.host);
};

export default resetPasswordController;
