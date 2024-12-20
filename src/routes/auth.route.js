const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');
const AuthMiddleware = require('../middleware/auth.middleware');
router.post('',AuthController.Testing);
router.post('/register',AuthController.registerUser);
router.post('/login',AuthController.login);
router.post('/update-profile',AuthMiddleware.verifyToken, AuthController.updateProfile);
router.get('/get-profile',AuthMiddleware.verifyToken,AuthController.getProfile);

module.exports= router;