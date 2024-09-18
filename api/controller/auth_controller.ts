import { Request, Response } from "express";
import Mail from "nodemailer/lib/mailer";
import { transport } from "../config/nodemailer";
import { OTP } from "../model/otp";
import { User } from "../model/user";

export const registration_controller = async (req: Request, res: Response) => {
  try {
    const request = new User({ ...req?.body, is_verified: false });
    await request.save();
    res.json({
      message: "User created successfully",
      status: 200,
      data: request,
    });
  } catch (e) {
    res.json({ message: "Internal Server error", status: 500 });
  }
};

export const otp_send_controller = async (req: Request, res: Response) => {
  try {
    const emailExits = await OTP.exists({ email: req?.body?.email });
    if (emailExits) {
      res.json({ message: "OTP already sent", status: 400 });
      return;
    } else {
      const otp = "34558";
      const request = new OTP({ ...req?.body, otp, createdAt: new Date() });
      const mailOptions: Mail.Options = {
        from: process.env.user_email,
        to: req?.body?.email,
        subject: "Email Verification",
        html: `
          <!DOCTYPE html>
          <html lang="en">
            <body>
                <p style="font-weight: bold;">Hello!</p>
                <p>Please user OTP to verify your account:</p>
                <p style="font-size: 20px; font-weight: bold;">${otp}</p>
                <p>Note: Please do not share your otp with anyone.</p>
            </body>
          </html>
        `,
      };
      await request.save();
      await transport.sendMail(mailOptions);
      res.json({ message: "OTP sent successfully", status: 200 });
    }
  } catch (e) {
    res.json({
      message: "Internal server error",
      status: 500,
    });
  }
};
