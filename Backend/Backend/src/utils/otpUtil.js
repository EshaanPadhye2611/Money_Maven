import nodemailer from "nodemailer";

const otpStore = new Map();

/**
 * Generate and send OTP via email
 * @param {string} email
 * @returns {boolean} success status
 */
export const sendOTP = async (email) => {
  const otp = Math.floor(100000 + Math.random() * 900000); 
  otpStore.set(email, otp);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ryashraj8218@gmail.com",
      pass: "tdij bgpf vrxl alue",
    },  
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP for Registration",
    text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`OTP sent to ${email}: ${otp}`);
    return true;
  } catch (error) {
    console.error("Error sending OTP:", error);
    return false;
  }
};

/**
 * Verify OTP
 * @param {string} email
 * @param {string} otp
 * @returns {boolean} isValid
 */
export const verifyOTP = (email, otp) => {
  const storedOtp = otpStore.get(email);
  if (storedOtp && storedOtp.toString() === otp) {
    otpStore.delete(email);
    return true;
  }
  return false;
};
