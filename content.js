function extractPrice() {
  console.log("Extracting price...");
  const salePriceElement = document.querySelector("div.price__sale span.price-item--sale");
  const regularPriceElement = document.querySelector("div.price__sale s.price-item--regular");

  let price = null;

  if (salePriceElement) {
    const salePriceText = salePriceElement.innerText.trim();
    price = parseFloat(salePriceText.replace(/[^0-9.]/g, ""));
  } else if (regularPriceElement) {
    const regularPriceText = regularPriceElement.innerText.trim();
    price = parseFloat(regularPriceText.replace(/[^0-9.]/g, ""));
  }

  return price;
}

// Listen for messages from the background script or popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getPrice") {
    const price = extractPrice();
    sendResponse({ price: price });
  }
});
