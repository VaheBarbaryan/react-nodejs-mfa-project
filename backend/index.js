import express from 'express';
import session from 'express-session';
import passport from 'passport';
import dotenv from 'dotenv';
import cors from 'cors';
import dbConnect from './src/config/dbConnect.js';
import authRoutes from './src/routes/authRoutes.js';
import './src/config/passportConfig.js';

dotenv.config();
await dbConnect();

const app = express();

const corsOptions = {
    origin: process.env.CORS_ORIGINS?.split(','),
    credentials: true,
}
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use(cors(corsOptions));
app.use(session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 1000,
    }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/auth', authRoutes)

const PORT = process.env.PORT || 7001;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});