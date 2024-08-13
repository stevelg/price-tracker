function extractPrice() {
  const priceElement = document.querySelector('span.oakhm64z_6112.oakhm627_6112.oakhm6y5_6112.oakhm610g_6112.oakhm6aj_6112');
  
  if (priceElement) {
    const priceText = priceElement.innerText.trim();
    const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
    return price;
  } else {
    return null;
  }
}

// Listen for messages from the background script or popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getPrice') {
    const price = extractPrice();
    sendResponse({ price: price });
  }
});
