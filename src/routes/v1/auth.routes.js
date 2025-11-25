const express = require('express');
const router = express.Router();
const { register, login, logout, me } = require('../../controllers/auth.controller');
const Joi = require('joi');
const validate = require('../../middlewares/validate.middleware');
const { authenticate } = require('../../middlewares/auth.middleware');
const registerSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('user','admin').optional()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.post('/logout', logout);
router.get('/me', authenticate, me);

module.exports = router;
