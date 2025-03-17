import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import { sendOTP, verifyOTP } from "../utils/otpUtil.js";

/**
 * Function to send OTP before registration
 */
export const sendOtp = async (req, res) => {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
  
    try {
      const otpSent = await sendOTP(email);
      if (!otpSent) {
        return res.status(500).json({ message: "Failed to send OTP" });
      }
      res.status(200).json({ success: true, message: "OTP sent successfully" });
    } catch (error) {
      console.error("Error sending OTP:", error);
      res.status(500).json({ message: "Error sending OTP" });
    }
  };

/**
 * Register user after OTP verification
 */
export const registerUser = async (req, res) => {
    const { email, password, username, phone, bankBalance, annualIncome, otp } = req.body;
  
    if (!verifyOTP(email, otp)) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }
  
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ email, password: hashedPassword, username, phone, bankBalance, annualIncome });
      await user.save();
  
      const token = jwt.sign({ id: user._id, email: user.email }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      });
  
      res.status(201).json({ message: "User registered successfully", token });
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ message: "Error registering user" });
    }
  };


// export const registerUser = async (req, res) => {
//     const { email, password, username, phone, bankBalance, annualIncome } = req.body;
//     try {
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ message: 'User already exists' });
//         }
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const user = new User({ email, password: hashedPassword, username, phone, bankBalance, annualIncome });
//         await user.save();
//         const token = jwt.sign({ id: user._id, email: user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
//         res.cookie('jwt', token, { httpOnly: true });
//         res.status(201).json({ message: 'User registered successfully' });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        console.log("Login request received for email:", email); // Log the email

        const user = await User.findOne({ email });
        if (!user) {
            console.error("Error: User not found");
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.error("Error: Password does not match");
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ _id: user._id, email: user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
        res.cookie('jwt', token, { httpOnly: true });
        res.json({ message: 'Login successful', token: token });
    } catch (error) {
        console.error("Error during login:", error.message); // Log the error message
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