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
