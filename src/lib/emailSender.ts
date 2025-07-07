import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "c55caa2cdf4d33",
    pass: "cc3ce6d80fb7bc",
  },
});

export const sendEmail = async ({
  from,
  to,
  subject,
  text,
  html,
}: {
  from: string;
  to: string;
  subject: string;
  text: string;
  html: string;
}) => {
  const mailOptions = {
    from,
    to,
    subject,
    text,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);

    console.log("Mailtrap sent: %s", info.messageId);
  } catch (error) {
    console.log("can't send an email", error);
    return error;
  }
};
