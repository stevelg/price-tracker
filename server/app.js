const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

app.post('/product', (req, res) => {
  const {productURL, desiredPrice, email} = req.body;

  res.status(200).send(`Received product URL: ${productURL} with desired price: ${desiredPrice} at email: ${email}`);

});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});