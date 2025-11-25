const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const { signToken } = require('../utils/jwt');

const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: 'Email already registered' });

    const hashed = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email, password: hashed, role: role || 'user' });

    const token = signToken({ id: user._id, role: user.role }, process.env.JWT_SECRET, '7d');

    // set httpOnly cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(201).json({ user: { id: user._id, name: user.name, email: user.email, role: user.role }, token });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

    const token = signToken({ id: user._id, role: user.role }, process.env.JWT_SECRET, '7d');

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });


    res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role }, token });
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out' });
};

const me = async (req, res, next) => {
  try {
    // You need your authentication middleware to set req.user
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

    res.json({ user: req.user });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login, logout, me };
