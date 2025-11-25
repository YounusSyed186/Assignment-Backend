const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const authenticate = async (req, res, next) => {
  try {
    // Support both httpOnly cookie and Authorization header
    const token = req.cookies?.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
    if (!token) return res.status(401).json({ message: 'Authentication token missing' });

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.id).select('-password');
    if (!user) return res.status(401).json({ message: 'User not found' });

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

const authorize = (...allowedRoles) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: 'Not authenticated' });
  if (!allowedRoles.includes(req.user.role)) return res.status(403).json({ message: 'Forbidden' });
  next();
};

module.exports = { authenticate, authorize };
