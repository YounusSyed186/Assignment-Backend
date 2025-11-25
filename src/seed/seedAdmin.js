require('dotenv').config();
const connectDB = require('../src/config/db');
const User = require('../src/models/user.model');
const bcrypt = require('bcrypt');

async function seed() {
  await connectDB(process.env.MONGO_URI);
  const existing = await User.findOne({ email: process.env.SEED_ADMIN_EMAIL });
  if (existing) {
    console.log('Admin already exists');
    process.exit(0);
  }
  const hashed = await bcrypt.hash(process.env.SEED_ADMIN_PASSWORD, 12);
  const u = await User.create({
    name: 'Admin',
    email: process.env.SEED_ADMIN_EMAIL,
    password: hashed,
    role: 'admin'
  });
  console.log('Admin created:', u.email);
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
