const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

app.post("/product", (req, res) => {
  const { productURL, desiredPrice, email } = req.body;
  console.log(productURL, desiredPrice, email);
  res.status(200).json({
    message: "Request successful",
    data: {
      productURL: productURL,
      desiredPrice: desiredPrice,
      email: email,
    },
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
