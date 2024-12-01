import passport from 'passport';
import { Router } from 'express';
import { authStatus, login, logout, register, reset2FA, setup2FA, verify2FA } from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.post('/register', register);
router.post('/login', passport.authenticate('local'), login);
router.get('/status', authStatus);
router.post('/logout', logout);

router.post('/2fa/setup', authMiddleware, setup2FA)
router.post('/2fa/verify', authMiddleware, verify2FA)
router.post('/2fa/reset', authMiddleware, reset2FA)

export default router;