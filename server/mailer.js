const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = (email, productURL, desiredPrice, currentPrice) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Price Alert",
    text: `The price of the product at ${productURL} has dropped to ${currentPrice}, which is below your desired price of ${desiredPrice}.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

const sendInitialEmail = (email, productURL, desiredPrice) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Price Alert",
    text: `You will be notified when the price of the product at ${productURL} drops below ${desiredPrice}.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = { sendEmail, sendInitialEmail };
