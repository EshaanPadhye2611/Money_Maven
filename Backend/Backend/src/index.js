import dotenv from 'dotenv';
dotenv.config({
    path: './.env'
});
import express from 'express';
import { app } from './app.js';
import { connectDB } from './db/db.js';
import passport from 'passport';
import './passportConfig.js';
import Stripe from 'stripe';

const port = process.env.PORT || 4000;
const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // Initialize Stripe

connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
        });
    })
    .catch(error => console.log(error));

app.get('/', (req, res) => {
    res.send('Server is ready');
});
app.get("/hi", (req, res) => {
    res.send("Hello World");
});

// 🔥 New Stripe Checkout Route
app.post("/create-checkout-session", async (req, res) => {
    try {
        const { amount, currency, description } = req.body;

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency,
                        product_data: { name: description },
                        unit_amount: amount * 100, // Stripe requires the amount in cents
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: "http://localhost:5173/user",  // React success page
            cancel_url: "http://localhost:5173/user",
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error("Error creating checkout session:", error);
        res.status(500).json({ error: error.message });
    }
});
