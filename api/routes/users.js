const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { findOne } = require("../models/Pin");

//Register a user
router.post("/register", async (req, res) => {
  try {
    //generate a new password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    //save user send res
    const user = await newUser.save();
    res.status(200).json(user._id);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Login

router.post("/login", async (req, res) => {
  try {
    //find user
    const user = await User.findOne({
      username: req.body.username,
    });
    !user && res.status(404).json("Invalid Credentials");
    //validate password
    const validaPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validaPassword && res.status(404).json("Invalid passowrd");
    //send res
    res.status(200).json({
      _id: user._id,
      username: user.username,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
