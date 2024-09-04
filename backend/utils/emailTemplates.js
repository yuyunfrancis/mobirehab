export const signUpTemplate = ({ verifyLink }) => {
  return `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; background-color: #f9f9f9; border-radius: 8px;">
          <h2 style="color: #4CAF50;">Welcome to MoniHealth!</h2>
          <p>Hello,</p>
          <p>Thank you for signing up for MoniHealth. Please click the button below to verify your email address.</p>
          <div style="text-align: center; margin: 20px 0;">
            <a href=${verifyLink} style="background-color: #4CAF50; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px;">Verify Email</a>
          </div>
          <p>If you did not sign up for MoniHealth, you can safely ignore this email.</p>
          <p>Best,</p>
          <p>The MoniHealth Team</p>
        </div>
        `;
};

export const appointmentConfirmationTemplate = ({ appointment }) => {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${appointment.subject}</title>
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
              <p>Hello ${appointment.name},</p>
              <p>Your appointment with ${appointment.therapistName} is confirmed for the following details:</p>
              <ul>
                <li><strong>Date:</strong> ${appointment.date}</li>
                <li><strong>Time:</strong> ${appointment.time}</li>
                <li><strong>Therapist:</strong> ${appointment.therapistName}</li>
                <li><strong>Status:</strong> ${appointment.status}</li>
              </ul>
              <div class="button">
                <a href=${appointment.link}>View Appointment</a>
              </div>
              <p>Please make sure to arrive 10 minutes early.</p>
            </div>
            <div class="footer">
              <p>&copy; MOBIREHAB Team</p>
            </div>
          </div>
        </body>
        </html> `;
};
