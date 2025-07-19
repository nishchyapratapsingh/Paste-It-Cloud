const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config();

router.post(
  "/createuser",
  check("email").isEmail(),
  check("name").isLength({ min: 3 }),
  check("password").isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() }); //returns validation errors

    try {
      let user = await User.findOne({ email: req.body.email }); //duplicate email check
      if (user) {
        return res.status(400).json({ error: "Email already in use" });
      }
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
      user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });
      await user.save();
      res.status(201).json({ success: "User created", user: user.name });
    } catch (error) {
      //catches errors to prevent crashes
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.post(
  "/login",
  check("email").isEmail(),
  check("password").isLength({ min: 3 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(400).json({ error: "Invalid email or password" });
      }
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch)
        return res.status(400).json({ error: "Invalid email or password" });

      const payload = {
        email: user.email,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

module.exports = router;
 