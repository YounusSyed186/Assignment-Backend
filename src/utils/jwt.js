const jwt = require("jsonwebtoken");

const signToken = ({ id, role }) => {
  return jwt.sign(
    { id, role }, // include role in token payload
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

module.exports = { signToken };
