const express = require('express');
const Note = require('../db/notes');
const auth = require('../middleware/auth');

const noteRouter = express.Router();

// Create a new note
noteRouter.post('/create',auth , async (req, res) => {
    console.log(req.body);
    const { title, description} = req.body;

  if (!title || !description) {
    return res.status(400).json({ success: false, message: 'Title and description are required' });
  }
  try {
    const newNote = new Note({
      title,
      description,
      user: req.body.mongoId,
    });

    const savedNote = await newNote.save();
    res.status(201).json({ success: true, note: savedNote });
  } catch (error) {
    console.error('Error creating note:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get all notes
noteRouter.get('/notes', auth, async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a specific note
noteRouter.get('/notes/search', auth, async (req, res) => {
    try {
        const { query, mongoId } = req.query;
        console.log(req.query);
        const notes = await Note.find({
            userId: mongoId,
            $or: [
                { title: { $regex: query, $options: 'i' } },
            ]
        });
        console.log(mongoId)
        console.log(notes);
        res.json({ notes });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a note
noteRouter.put('/notes/edit/:id', auth, async (req, res) => {
    try {
        const note = await Note.findByIdAndUpdate(req.params.id);
        console.log(req.params.id);
        if (note == null) {
            return res.status(404).json({ message: 'Cannot find note' });
        }

        if (req.body.title != null) {
            note.title = req.body.title;
        }

        if (req.body.description != null) {
            note.description = req.body.description;
        }

        note.updatedAt = new Date();

        await note.save();
        res.json(note);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete a note
noteRouter.delete('/notes/:id', auth, async (req, res) => {
    try {
        const note = await Note.findByIdAndDelete(req.params.id);
        console.log(note);
        if (note == null) {
            return res.status(404).json({ message: 'Cannot find note' });
        }
        res.json({ message: 'Deleted note' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = noteRouter;