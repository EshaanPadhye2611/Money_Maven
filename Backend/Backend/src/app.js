// filepath: c:\Users\Atharva Jamdade\Desktop\CC\Backend\src\app.js
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import session from 'express-session';
import { generateJWT } from './passportConfig.js';
import authRoutes from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js'

const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
app.use(express.json({ limit: '16kb' }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));

app.use(session({
    secret: process.env.ACCESS_TOKEN_SECRET,
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/v1', authRoutes);
app.use('/api/v1/user',userRouter);

app.get('/hi', (req, res) => {
    res.send('Hello World');
});

export { app };