document.addEventListener('DOMContentLoaded', () => {
  // Send a message to the content script to get the price
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'getPrice' }, (response) => {
      if (response && response.price !== null) {
        document.getElementById('price').textContent = `$${response.price.toFixed(2)}`;
      } else {
        document.getElementById('price').textContent = 'Price not found.';
      }
    });
  });
});
