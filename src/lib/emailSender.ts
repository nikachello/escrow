import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "c55caa2cdf4d33",
    pass: "cc3ce6d80fb7bc",
  },
});

export const sendVerificationEmail = async ({
  to,
  url,
}: {
  to: string;
  url: string;
}) => {
  const mailOptions = {
    from: `"Shuamavali no-reply@test.com`,
    to,
    subject: `აქტივაცია Shuamavali.ge-ზე`,
    text: `დააჭირეთ ლინკს ემაილის გასააქტიურებლად: ${url}`,
    html: `<p>დააჭირეთ <a href=${url}>აქ</a></p>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);

    console.log("Mailtrap sent: %s", info.messageId);
  } catch (error) {
    console.log("can't send an email", error);
    return error;
  }
};
