const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

// variables for testing purposes
const price = 50;
const products = [];

// Nodemailer transporter setup
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

app.post("/product", (req, res) => {
  const { productURL, desiredPrice, email } = req.body;
  console.log(productURL, desiredPrice, email);

  // use persistent storage later
  products.push({ productURL, desiredPrice, email });

  res.status(200).json({
    message: "Request successful",
    data: {
      productURL: productURL,
      desiredPrice: desiredPrice,
      email: email,
    },
  });

  // test send email
  sendInitialEmail(email, productURL, desiredPrice);
  sendEmail(email, productURL, desiredPrice, price);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
