# Price Tracker 📉

This project consists of a Node.js server and a Chrome extension that helps track product prices (currently for https://dreamruns.com/) and get notified via email when the price drops below your desired value.

## Description

The Price Tracker project allows users to:
- Set a desired price and receive notifications when the price drops below this value.
- Save their email for receiving notifications.

## Installation Instructions

### Server 🚀

1. **Install dependencies:**

   ```sh
   npm install
   ```

2. **Add environment variables:**

   Create a `.env` file in the root directory and add your Gmail credentials (email and app password):

   ```env
   EMAIL_SERVICE=gmail
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ```

3. **Start the server:**

   ```sh
   node app.js
   ```

### Extension 🌐

1. **Open Chrome Extensions page:**

   Go to: `chrome://extensions/`

2. **Enable Developer mode:**

   Enable Developer mode.

3. **Load the unpacked extension:**

   Click on "Load unpacked".

4. **Select the extension directory:**

   Navigate to the `extension` directory in your project and select it.

## Usage

- **Track a product:**
  - Currently designed to work on https://dreamruns.com/ only
  - Navigate to the product page you want to track.
  - Open the extension popup.
  - Enter your desired price and email.
  - Click the "Track" button.

- **Save your email:**
  - Enter your email in the input field.
  - Click the "Save Email" button to save your email for future use.
