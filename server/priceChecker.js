const axios = require("axios");
const cheerio = require("cheerio");

const fetchCurrentPrice = async (productURL) => {
  try {
    console.log("Fetching current price...");
    console.log("Product URL:", productURL);
    const response = await axios.get(productURL);
    // console.log("Response status:", response.status);
    const $ = cheerio.load(response.data);

    let currentPrice = null;

    const salePriceElement = $("div.price__sale span.price-item--sale");
    if (salePriceElement.length) {
      const salePriceText = salePriceElement.text().trim();
      currentPrice = parseFloat(salePriceText.replace(/[^0-9.]/g, ""));
    } else {
      const regularPriceElement = $("div.price__sale s.price-item--regular");
      if (regularPriceElement.length) {
        const regularPriceText = regularPriceElement.text().trim();
        currentPrice = parseFloat(regularPriceText.replace(/[^0-9.]/g, ""));
      }
    }

    return currentPrice;
  } catch (error) {
    console.error("Error fetching current price:", error);
    return null;
  }
};

module.exports = { fetchCurrentPrice };
