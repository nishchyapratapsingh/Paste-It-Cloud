const express = require("express");
const fetchuser = require("../middlewares/fetchuser");
const Notes = require("../models/Notes");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const { set } = require("mongoose");

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

router.put(  //put req for updation
  "/updatenote/:id",
  fetchuser,
  async (req, res) => {
    try {
      const {title, description, tag} =req.body;
      const newNote = {};
      if (title) {newNote.title = title};
      if (description) {newNote.description = description};
      if (tag) {newNote.tag = tag};

      let note = await Notes.findById(req.params.id);
      if (!note) {
        return res.status(404).send("Not Found");
      }
      if ((note.user.toString()) != req.userId) {
        return res.status(401).send("Not Found");
      }
      note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true} )
      res.status(200).json({ success: "note updated", title: req.body.title });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
);




module.exports = router;
