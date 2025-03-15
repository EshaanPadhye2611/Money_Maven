// filepath: c:\Users\Atharva Jamdade\Desktop\CC\Backend\src\index.js
import dotenv from 'dotenv';
dotenv.config({
    path: './.env'
});
import express from 'express';
import { app } from './app.js';
import { connectDB } from './db/db.js';
import passport from 'passport';
import './passportConfig.js';

const port = process.env.PORT || 3000;

connectDB()
.then(() => {
    app.listen(port, () => {
        console.log(`Serve at http://localhost:${port}`);
    });
})
.catch(error => console.log(error));

app.get('/', (req, res) => {
    res.send('Server is ready');
});
app.get("/hi", (req, res) => {
    res.send("Hello World");
});