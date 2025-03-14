const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 5000;

app.use(express.json());

// Set environment and credentials
const APP_ENVIRONMENT = 'live';  // or 'sandbox'
const consumer_key = "V5CKXg4yvYTJg8A4AfqZAq+IXn5DCQKX";  // Replace with your actual consumer key
const consumer_secret = "bVamie3YmeUfZ2NZy4HsB2vIGo4=";  // Replace with your actual consumer secret

// Define the API URLs based on environment
let api_url, ipn_registration_url, submit_order_url, get_ipn_list_url;

if (APP_ENVIRONMENT === 'sandbox') {
  api_url = "https://cybqa.pesapal.com/pesapalv3/api/Auth/RequestToken";
  ipn_registration_url = "https://cybqa.pesapal.com/pesapalv3/api/URLSetup/RegisterIPN";
  submit_order_url = "https://cybqa.pesapal.com/pesapalv3/api/Transactions/SubmitOrderRequest";
  get_ipn_list_url = "https://cybqa.pesapal.com/pesapalv3/api/URLSetup/GetIpnList";
} else if (APP_ENVIRONMENT === 'live') {
  api_url = "https://pay.pesapal.com/v3/api/Auth/RequestToken";
  ipn_registration_url = "https://pay.pesapal.com/v3/api/URLSetup/RegisterIPN";
  submit_order_url = "https://pay.pesapal.com/v3/api/Transactions/SubmitOrderRequest";
  get_ipn_list_url = "https://pay.pesapal.com/v3/api/URLSetup/GetIpnList";
} else {
  console.error("Invalid APP_ENVIRONMENT");
  process.exit();
}

// Step 1: Request Token from Pesapal
async function requestToken() {
  try {
    const response = await axios.post(api_url, {
      consumer_key,
      consumer_secret,
    }, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    });

    if (response.status === 200) {
      return response.data.token;
    } else {
      throw new Error(`Error requesting token: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Step 2: Register IPN (Instant Payment Notification)
async function registerIPN(token) {
  try {
    const response = await axios.post(ipn_registration_url, {
      url: "https://your-url.com/pesapal/pin.php", // Replace with your actual URL
      ipn_notification_type: "POST",
    }, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    if (response.status === 200) {
      return response.data.ipn_id;
    } else {
      throw new Error(`Error registering IPN: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Step 3: Submit Order Request
async function submitOrder(token, ipn_id, amount, description, callback_url) {
  const merchant_reference = Math.floor(Math.random() * 1000000000000000000);

  const data = {
    id: String(merchant_reference),
    currency: "KES",
    amount,
    description,
    callback_url,
    notification_id: ipn_id,
    branch: "Nito_industries",
    billing_address: {
      email_address: "",
      phone_number: "", // Add phone number if needed
      country_code: "KE",
      first_name: "",
      middle_name: "",
      last_name: "",
      line_1: "Pesapal Limited",
      line_2: "",
      city: "",
      state: "",
      postal_code: "",
      zip_code: "",
    }
  };

  try {
    const response = await axios.post(submit_order_url, data, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Error submitting order: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Endpoint to handle payment
app.post('/submit-order', async (req, res) => {
  try {
    const { amount, description, callback_url } = req.body;

    // Step 1: Get the token
    const token = await requestToken();
    if (!token) throw new Error("Failed to get token");

    // Step 2: Register IPN
    const ipn_id = await registerIPN(token);
    if (!ipn_id) throw new Error("Failed to register IPN");

    // Step 3: Submit the order
    const orderResponse = await submitOrder(token, ipn_id, amount, description, callback_url);

    res.json(orderResponse);
  } catch (error) {
    console.error("Error in the process:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});