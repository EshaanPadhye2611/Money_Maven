import { Router } from 'express';
import passport from 'passport';
import { registerUser, loginUser, googleOAuthCallback, completeProfile } from '../controllers/auth.controller.js';
import { authenticateJWT } from '../middlewares/auth.middleware.js';
import { sendOtp } from "../controllers/auth.controller.js";
const router = Router();

router.post('/auth/register', registerUser);
router.post('/auth/login', loginUser);

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), googleOAuthCallback);

router.post('/auth/send-otp', sendOtp);

router.post('/complete-profile', completeProfile);

router.get('/protected', authenticateJWT, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});

export default router;