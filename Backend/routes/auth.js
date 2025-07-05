const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { check, validationResult } = require("express-validator");

router.post(
  "/",
  check("email").isEmail(),
  check("name").isLength({ min: 3 }),
  check("password").isLength({ min: 8 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      const user = User(req.body);
      await user.save();
      res.status(201).json({ success: "User created", user});
    } catch (error) {
      if (error.code === 11000) {
        res.status(400).json({ error: "Email already in use" });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  }
);

module.exports = router;
