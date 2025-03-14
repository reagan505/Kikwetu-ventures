const express = require("express");
const axios = require("axios");
const app = express();
const port = 3000;

// Pesapal Configuration
const APP_ENVIRONMENT = "sandbox"; // Change to 'live' for production
const consumerKey = "3uOP67/JqieNDq7lJzpKgJr0j0AsnHFr";
const consumerSecret = "GwdOVSKze2Mpx1oVYeLH4cbxDRo=";

const apiUrl = APP_ENVIRONMENT === "sandbox"
    ? "https://cybqa.pesapal.com/pesapalv3/api/Auth/RequestToken"
    : "https://pay.pesapal.com/v3/api/Auth/RequestToken";
const ipnRegistrationUrl = APP_ENVIRONMENT === "sandbox"
    ? "https://cybqa.pesapal.com/pesapalv3/api/URLSetup/RegisterIPN"
    : "https://pay.pesapal.com/v3/api/URLSetup/RegisterIPN";
const submitOrderUrl = APP_ENVIRONMENT === "sandbox"
    ? "https://cybqa.pesapal.com/pesapalv3/api/Transactions/SubmitOrderRequest"
    : "https://pay.pesapal.com/v3/api/Transactions/SubmitOrderRequest";

// Middleware to parse JSON
app.use(express.json());

// Request Pesapal Token
async function requestToken() {
    try {
        console.log("Requesting token from Pesapal...");
        const response = await axios.post(apiUrl, {
            consumer_key: consumerKey,
            consumer_secret: consumerSecret,
        }, {
            headers: { "Content-Type": "application/json", "Accept": "application/json" },
        });
        console.log("Token received:", response.data.token);
        return response.data.token;
    } catch (error) {
        console.error("Error requesting token:", error.response?.data || error.message);
        return null;
    }
}

// Register IPN
async function registerIPN(token) {
    try {
        console.log("Registering IPN with token:", token);
        const response = await axios.post(ipnRegistrationUrl, {
            url: "https://your-ngrok-url.ngrok-free.app/pesapal-ipn", // Replace with your ngrok URL
            ipn_notification_type: "POST",
        }, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });
        console.log("IPN registered, ID:", response.data.ipn_id);
        return response.data.ipn_id;
    } catch (error) {
        console.error("Error registering IPN:", error.response?.data || error.message);
        return null;
    }
}

// Submit Order
async function submitOrder(token, ipnId, tripDetails) {
    const merchantReference = Math.floor(Math.random() * 1000000000000000000).toString();
    const callbackUrl = "http://localhost:3000/payment-success";

    try {
        console.log("Submitting order with token:", token, "and IPN ID:", ipnId);
        console.log("Trip Details:", tripDetails);
        const response = await axios.post(submitOrderUrl, {
            id: merchantReference,
            currency: "KES",
            amount: tripDetails.amount,
            description: `Custom Trip to ${tripDetails.destination}`,
            callback_url: callbackUrl,
            notification_id: ipnId,
            branch: "Kikwetu Ventures",
            billing_address: {
                email_address: tripDetails.email || "customer@example.com",
                phone_number: tripDetails.phone || "+254799744638",
                country_code: "KE",
                first_name: "Customer",
                last_name: "Name",
                line_1: "Nairobi",
            },
        }, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });
        console.log("Order response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error submitting order:", error.response?.data || error.message);
        return null;
    }
}

// Endpoint to handle order submission
app.post("/submit-order", async (req, res) => {
    const tripDetails = req.body;
    console.log("Received request at /submit-order with tripDetails:", tripDetails);

    const token = await requestToken();
    if (!token) {
        console.log("Token request failed, sending error response.");
        return res.status(500).json({ error: "Failed to obtain payment token" });
    }

    const ipnId = await registerIPN(token);
    if (!ipnId) {
        console.log("IPN registration failed, sending error response.");
        return res.status(500).json({ error: "Failed to register payment notification" });
    }

    const orderResponse = await submitOrder(token, ipnId, tripDetails);
    if (orderResponse && orderResponse.redirect_url) {
        console.log("Order successful, sending redirect URL:", orderResponse.redirect_url);
        res.json({ redirect_url: orderResponse.redirect_url });
    } else {
        console.log("Order submission failed, sending error response.");
        res.status(500).json({ error: "Failed to initiate payment" });
    }
});

// Payment success callback (for testing)
app.get("/payment-success", (req, res) => {
    console.log("Payment success callback received:", req.query);
    res.send("Payment successful! Thank you for your purchase.");
});

// IPN endpoint (for Pesapal notifications)
app.post("/pesapal-ipn", (req, res) => {
    console.log("IPN Received:", req.body);
    res.json({ status: "success" });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});