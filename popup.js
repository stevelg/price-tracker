document.addEventListener("DOMContentLoaded", () => {
  // Send a message to the content script to get the price
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "getPrice" }, (response) => {
      if (response && response.price !== null) {
        document.getElementById("price").textContent = `$${response.price.toFixed(2)}`;
      } else {
        document.getElementById("price").textContent = "Price not found.";
      }
    });
  });

  // Sending the product URL, desired price, and email to the server
  const trackButton = document.getElementById("trackButton");
  const emailInput = document.getElementById("emailInput");
  const saveEmailButton = document.getElementById("saveEmailButton");

  // Load saved email from local storage
  chrome.storage.local.get("email", (data) => {
    emailInput.value = data.email || "";
  });

  // Save email to local storage on button click
  saveEmailButton.addEventListener("click", () => {
    chrome.storage.local.set({ email: emailInput.value }, () => {
      console.log("Email saved:", emailInput.value);
    });
  });

  // add validation to the email input
  trackButton.addEventListener("click", () => {
    const email = emailInput.value;
    const desiredPrice = document.getElementById("desiredPrice").value;

    if (!email) {
      errorMessage.textContent = "Email is required.";
      errorMessage.style.display = "block";
    } else if (!validateEmail(email)) {
      errorMessage.textContent = "Invalid email format.";
      errorMessage.style.display = "block";
    } else {
      errorMessage.style.display = "none";
      trackButton.disabled = true;

      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const productURL = tabs[0].url;
        const data = {
          productURL: productURL,
          desiredPrice: desiredPrice,
          email: email,
        };

        // Send POST request to the server

        fetch("http://localhost:3000/product", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              return response.text().then((text) => {
                throw new Error(`Unexpected response format: ${text}`);
              });
            }
          })
          .then((data) => {
            console.log("Success:", data);
            successMessage.style.display = "block";
            setTimeout(() => {
              successMessage.style.display = "none";
            }, 3000); // Hide success message after 3 seconds
            trackButton.disabled = false;
          })
          .catch((error) => {
            console.error("Error:", error);
            errorMessage.textContent = "Failed to send data to the server.";
            errorMessage.style.display = "block";
            trackButton.disabled = false;
          });
      });
    }
  });

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }
});
