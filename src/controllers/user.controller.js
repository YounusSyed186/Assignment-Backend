// src/controllers/user.controller.js
const User = require('../models/user.model');

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.aggregate([
      { $project: { name: 1, email: 1, role: 1 } },
      {
        $lookup: {
          from: "tasks",         // MongoDB collection name for tasks
          localField: "_id",     // User _id
          foreignField: "owner", // Task owner field
          as: "tasks",
        },
      },
    ]);
    res.json(users);
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllUsers };
