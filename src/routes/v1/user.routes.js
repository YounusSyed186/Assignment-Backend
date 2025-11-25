// src/routes/v1/user.routes.js
const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../../middlewares/auth.middleware');
const { getAllUsers } = require('../../controllers/user.controller');

router.get('/', authenticate, authorize('admin'), getAllUsers);

module.exports = router;
