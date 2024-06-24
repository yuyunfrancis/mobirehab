import { config } from "dotenv";
config();
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async ({
  recipientEmail,
  subject,
  template_data,
  req = {}, // Provide a default value for `req`
  emailType,
}) => {
  let htmlContent;
  const host = req.headers ? req.headers.host : "example.com";

  switch (emailType) {
    case "signup":
      htmlContent = `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; background-color: #f9f9f9; border-radius: 8px;">
          <h2 style="color: #4CAF50;">Welcome to MoniHealth!</h2>
          <p>Hello,</p>
          <p>Thank you for signing up for MoniHealth. Please click the button below to verify your email address.</p>
          <div style="text-align: center; margin: 20px 0;">
            <a href="http://${req.headers.host}/api/v1/therapist/verify-email?otp=${template_data.otp}" style="background-color: #4CAF50; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px;">Verify Email</a>
          </div>
          <p>If you did not sign up for MoniHealth, you can safely ignore this email.</p>
          <p>Best,</p>
          <p>The MoniHealth Team</p>
        </div>
      `;
      break;

    case "appointment_patient":
      htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${subject}</title>
          <style>
            body, h1, h2, h3, h4, h5, h6, p, ul, li {
              margin: 0;
              padding: 0;
            }
            body {
              font-family: Arial, sans-serif;
              background-color: #f5f5f5;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #fff;
              border-radius: 8px;
              box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            }
            .header {
              text-align: center;
              margin-bottom: 20px;
            }
            .header h1 {
              font-size: 24px;
              color: #4CAF50;
            }
            .content p {
              margin-bottom: 10px;
            }
            .content ul {
              list-style-type: none;
              margin-bottom: 20px;
            }
            .content ul li {
              margin-bottom: 5px;
            }
            .button {
              text-align: center;
              margin: 20px 0;
            }
            .button a {
              background-color: #4CAF50;
              color: #fff;
              text-decoration: none;
              padding: 10px 20px;
              border-radius: 5px;
            }
            .footer {
              text-align: center;
              margin-top: 20px;
              color: #888;
            }
            @media (max-width: 480px) {
              .container {
                padding: 10px;
              }
              .header h1 {
                font-size: 20px;
              }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Appointment Confirmation</h1>
            </div>
            <div class="content">
              <p>Hello ${template_data.name},</p>
              <p>Your appointment with ${template_data.therapistName} is confirmed for the following details:</p>
              <ul>
                <li><strong>Date:</strong> ${template_data.date}</li>
                <li><strong>Time:</strong> ${template_data.time}</li>
                <li><strong>Therapist:</strong> ${template_data.therapistName}</li>
                <li><strong>Status:</strong> ${template_data.status}</li>
              </ul>
              <div class="button">
                <a href="http://${req.headers.host}/api/v1/appointments/view/${template_data.appointmentId}">View Appointment</a>
              </div>
              <p>Please make sure to arrive 10 minutes early.</p>
            </div>
            <div class="footer">
              <p>&copy; MOBIREHAB Team</p>
            </div>
          </div>
        </body>
        </html>
      `;
      break;

    case "appointment_therapist":
      htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${subject}</title>
          <style>
            body, h1, h2, h3, h4, h5, h6, p, ul, li {
              margin: 0;
              padding: 0;
            }
            body {
              font-family: Arial, sans-serif;
              background-color: #f5f5f5;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #fff;
              border-radius: 8px;
              box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            }
            .header {
              text-align: center;
              margin-bottom: 20px;
            }
            .header h1 {
              font-size: 24px;
              color: #4CAF50;
            }
            .content p {
              margin-bottom: 10px;
            }
            .content ul {
              list-style-type: none;
              margin-bottom: 20px;
            }
            .content ul li {
              margin-bottom: 5px;
            }
            .button {
              text-align: center;
              margin: 20px 0;
            }
            .button a {
              background-color: #4CAF50;
              color: #fff;
              text-decoration: none;
              padding: 10px 20px;
              border-radius: 5px;
            }
            .footer {
              text-align: center;
              margin-top: 20px;
              color: #888;
            }
            @media (max-width: 480px) {
              .container {
                padding: 10px;
              }
              .header h1 {
                font-size: 20px;
              }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Appointment Notification</h1>
            </div>
            <div class="content">
              <p>Hello ${template_data.name},</p>
              <p>You have a new appointment scheduled with ${template_data.patientName}:</p>
              <ul>
                <li><strong>Date:</strong> ${template_data.date}</li>
                <li><strong>Time:</strong> ${template_data.time}</li>
                <li><strong>Patient:</strong> ${template_data.patientName}</li>
                <li><strong>Service:</strong> ${template_data.service}</li>
                <li><strong>Purpose:</strong> ${template_data.purpose}</li>
              </ul>
              <div class="button">
                <a href="http://${req.headers.host}/api/v1/therapist/approve-appointment/${template_data.appointmentId}">Approve Appointment</a>
              </div>
            </div>
            <div class="footer">
              <p>&copy; MOBIREHAB Team</p>
            </div>
          </div>
        </body>
        </html>
      `;
      break;
  }

  const msg = {
    to: recipientEmail,
    from: process.env.SENDGRID_VERIFIED_SENDER || "falconinnovcm@gmail.com",
    subject: subject,
    html: htmlContent,
  };

  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error(error);
    throw new Error("Could not send email");
  }
};

export default sendEmail;
