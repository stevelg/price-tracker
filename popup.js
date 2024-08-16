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

  // Sending the product URL, desired price, and email to the server
  const trackButton = document.getElementById('trackButton');




  const emailInput = document.getElementById('emailInput');
  const saveEmailButton = document.getElementById('saveEmailButton');

  // Load saved email from local storage
    chrome.storage.local.get('email', (data) => {
        emailInput.value = data.email || '';
    });
  
  // Save email to local storage on button click
  saveEmailButton.addEventListener('click', () => {
      chrome.storage.local.set({ email: emailInput.value }, () => {
          console.log('Email saved:', emailInput.value);
      });
  });

  // add validation to the email input
  trackButton.addEventListener('click', () => {
      const email = emailInput.value;
      if (!email) {
          errorMessage.textContent = 'Email is required.';
          errorMessage.style.display = 'block';
      } else if (!validateEmail(email)) {
          errorMessage.textContent = 'Invalid email format.';
          errorMessage.style.display = 'block';
      } else {
          errorMessage.style.display = 'none';
          trackButton.disabled = true;
      }
  });

  function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
  }

});
