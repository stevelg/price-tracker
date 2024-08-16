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

// Periodic price check every 60 seconds
setInterval(async () => {
  if (products.length === 0) {
    return;
  }

  for (const product of products) {
    const { productURL, desiredPrice, email } = product;

    // Fetch the current price
    const currentPrice = await fetchCurrentPrice(productURL);
    console.log(currentPrice);

    if (currentPrice !== null && currentPrice <= desiredPrice) {
      sendEmail(email, productURL, desiredPrice, currentPrice);
    }
  }
}, 10000);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
