import Mail from "nodemailer/lib/mailer";

export const generateOTPMail = ({
  email,
  otp,
}: {
  email: string;
  otp: string;
}) => {
  const mailOptions: Mail.Options = {
    from: process.env.user_email,
    to: email,
    subject: "Email Verification",
    html: `
      <!DOCTYPE html>
      <html lang="en">
        <body>
            <p style="font-weight: bold;">Hello!</p>
            <p>Please use OTP to verify your account:</p>
            <p style="font-size: 20px; font-weight: bold;">${otp}</p>
            <p>Note: Please do not share your otp with anyone.</p>
        </body>
      </html>
    `,
  };

  return mailOptions;
};
