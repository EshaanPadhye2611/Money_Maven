import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';

export const registerUser = async (req, res) => {
    const { email, password, username, phone, bankBalance, annualIncome } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashedPassword, username, phone, bankBalance, annualIncome });
        await user.save();
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
        res.cookie('jwt', token, { httpOnly: true });
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
        res.cookie('jwt', token, { httpOnly: true });
        res.json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const googleOAuthCallback = async (req, res) => {
    const { id, emails, displayName } = req.user;
    const email = emails[0].value;
    let user = await User.findOne({ email });

    if (!user) {
        // Redirect to frontend route to collect additional fields
        res.redirect(`/complete-profile?email=${email}&username=${displayName}`);
    } else {
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
        res.cookie('jwt', token, { httpOnly: true });
        res.redirect('/');
    }
};

export const completeProfile = async (req, res) => {
    const { email, phone, bankBalance, annualIncome } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        user.phone = phone;
        user.bankBalance = bankBalance;
        user.annualIncome = annualIncome;
        await user.save();
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
        res.cookie('jwt', token, { httpOnly: true });
        res.json({ message: 'Profile completed successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};