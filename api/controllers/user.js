const User = require("../models/User");

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err) {
      return res.status(401).json({
        error: "User Not Found",
      });
    }
    req.profile = user;
    next();
  });
};

//Get User

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.profile._id);
    res.json(user);
  } catch (error) {
    res.status(401).json({
      error: "faied to find the user",
    });
  }
};

//Get all User
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(400).json({
      error: "failed to get all users",
    });
  }
};

//Update User

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true },
    (err, user) => {
      if (err) {
        res.status(400).json({
          error: "Failed To Update",
        });
      }
      res.json(user);
    }
  );
};

//Delete User
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndRemove({ _id: req.profile._id });
    res.json({
      message: "User deleted Successfully",
    });
  } catch (error) {
    res.status(401).json({
      error: "Failed To delete This User",
    });
  }
};

//Get user status

exports.getUserStatus = async (req, res) => {
  try {
    const data = await User.aggregate([
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.json(data);
  } catch (error) {
    res.status(401).json(err);
  }
};
