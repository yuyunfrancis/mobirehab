// sendGridEmail.js
import sgMail from "@sendgrid/mail";
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async ({ receipientEmail, subject, template_data, req }) => {
  const msg = {
    to: receipientEmail,
    from: process.env.SENDGRID_VERIFIED_SENDER || "falconinnovcm@gmail.com",
    subject: "Email from MoniHealth",
    text: `Hello, welcome to MoniHealth. Please verify your email address.`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #4CAF50;">Welcome to MoniHealth!</h2>
        <p>Hello,</p>
        <p>Thank you for signing up for MoniHealth. Please click the button below to verify your email address.</p>
        <div style="text-align: center;">
          <a href="http://${req.headers.host}/api/v1/therapist/verify-email?otp=${template_data.otp}" style="background-color: #4CAF50; color: #fff; text-decoration: none; padding: 10px 20px; margin: 20px 0; display: inline-block; border-radius: 5px;">Verify Email</a>
        </div>
        <p>If you did not sign up for MoniHealth, you can safely ignore this email.</p>
        <p>Best,</p>
        <p>The MoniHealth Team</p>
      </div>
    `,
  };

  try {
    const response = await sgMail.send(msg);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw new Error("Could not send email");
  }
};

export default sendEmail;
