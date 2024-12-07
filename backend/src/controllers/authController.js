import bcrypt from 'bcryptjs'
import User from "../models/user.js";
import speakeasy from "speakeasy";
import qrCode from "qrcode";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            password: hashedPassword,
            isMfaActive: false,
        })
        console.log(`New User: ${newUser}`)
        await newUser.save();
        res.status(201).json({message: 'User registered successfully.'});
    } catch (err) {
        res.status(500).json({ error: 'Error registering user', message: err })
    }
}

export const login = (req, res) => {
    console.log(`Authenticated user: ${req.user}`)
    res.status(200).json({
        message: 'User logged in successfully.',
        username: req.user.username,
        isMfaActive: req.user.isMfaActive
    });
}

export const authStatus = (req, res) => {
    if(req.user) {
        res.status(200).json({
            message: 'User logged in successfully.',
            username: req.user.username,
            isMfaActive: req.user.isMfaActive
        })
    } else {
        res.status(401).json({message: 'Unauthorized user.'})
    }
}

export const logout = (req, res) => {
    if(!req.user) res.status(401).json({message: 'Unauthorized user.'})
    req.logout((err) => {
        if(err) return next(err)
        req.session.destroy((err) => {
            if(err) return next(err)
        })
        res.clearCookie('connect.sid')
        return res.status(200).json({message: 'Logged out successfully.'})
    })
}

export const setup2FA = async (req, res) => {
    try {
        console.log(`The req.user is: ${req.user}`);
        const user = req.user;
        const secret = speakeasy.generateSecret();
        console.log(`The secret is: ${secret}`);
        user.twoFactorSecret = secret.base32;
        user.isMfaActive = true
        await user.save();
        const url = speakeasy.otpauthURL({
            secret: secret.base32,
            label: `${req.user.username}`,
            encoding: 'base32',
            issuer: process.env.MFA_ISSUER
        });
        const qrImageUrl = await qrCode.toDataURL(url);
        res.status(200).json({
            secret: secret.base32,
            qrCode: qrImageUrl
        })
    } catch (err) {
        res.status(500).json({ error: 'Error setting up 2FA', message: err })
    }
}

export const verify2FA = (req, res) => {
    const { token } = req.body;
    const user = req.user;

    const verified = speakeasy.totp.verify({
        secret: user.twoFactorSecret,
        encoding: 'base32',
        token
    });

    if(verified) {
        const jwtToken = jwt.sign(
            { username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1hr' }
        );
        res.status(200).json({ message: '2FA verified successfully.', token: jwtToken })
    } else {
        res.status(400).json({ message: 'Invalid 2FA token.' })
    }
}

export const reset2FA = async (req, res) => {
    try {
        const user = req.user;
        user.twoFactorSecret = '';
        user.isMfaActive = false;
        await user.save()
        res.status(200).json({ message: '2FA reseted successfully.' });
    } catch (err) {
        res.status(500).json({ error: 'Error reseting 2FA', message: err})
    }
}