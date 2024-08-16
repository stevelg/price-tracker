const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const { fetchCurrentPrice } = require("./priceChecker.js");
const { sendEmail, sendInitialEmail } = require("./mailer.js");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

// variables for testing purposes
// const price = 50;
const products = [];

// routes
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

  sendInitialEmail(email, productURL, desiredPrice);
});

setInterval(async () => {
  if (products.length === 0) {
    return;
  }

  for (let i = products.length - 1; i >= 0; i--) {
    const { productURL, desiredPrice, email } = products[i];

    const currentPrice = await fetchCurrentPrice(productURL);
    console.log(currentPrice);

    if (currentPrice !== null && currentPrice <= desiredPrice) {
      sendEmail(email, productURL, desiredPrice, currentPrice);
      products.splice(i, 1);
    }
  }
}, 10000);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
