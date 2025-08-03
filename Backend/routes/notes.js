const express = require("express");
const fetchuser = require("../middlewares/fetchuser");
const Notes = require("../models/Notes");
const router = express.Router();
const { check, validationResult } = require("express-validator");

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  const notes = await Notes.find({ user: req.userId });
  res.json([notes]);
});

router.post(
  "/createnote",
  fetchuser,
  check("title").isLength({ min: 1 }),
  check("description").isLength({ min: 1 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors }); //returns validation errors

    try {
      const note = new Notes({
        user: req.userId,
        title: req.body.title,
        description: req.body.description,
        tag: req.body.tag,
      });
      await note.save();
      res.status(201).json({ success: "note created", title: req.body.title });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

module.exports = router;
