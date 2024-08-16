require('dotenv').config();
const nodemailer = require('nodemailer');

// Create a transport using your existing configuration
var transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  }
});

// Define email options
const mailOptions = {
  to: 'mochakunxi@gmail.com',
  subject: 'Test Email',
  text: 'This is a test email sent using Nodemailer.'
};

// Send the email
transport.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log(error);
  }
  console.log('Message sent: %s', info.messageId);
});