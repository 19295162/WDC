const express = require('express');
const _ = require('lodash');
const models = require('../models');

const router = express.Router();

// Selects only the fields that are allowed to be set by users
function noteFields(obj) {
  return _.pick(obj, ['title', 'content', 'notebookId']);
}

/* *** TODO: Fill in the API endpoints for notes *** */
//Return a list of all notes
router.get('/', (req, res) => {
    const queryOptions = {
      order: [['createdAt', 'DESC']]
    };
    models.Note.findAll(queryOptions)
    .then(notes => res.json(notes))
    .catch(err => res.status(500).json({ error: err.message }));
});

//Create a new note with posted data
router.post('/', (req, res) => {
    models.Note.create(noteFields(req.body))
      .then(note => res.json(note))
      .catch(err => res.status(422).json({ error: err.message }));
});

//Return a note with the specified id
router.get('/:noteId', (req, res) => {
    models.Note.findById(req.params.noteId)
      .then(note => res.json(note))
      .catch(err => res.status(500).json({ error: err.message }));
});

//Delete a note with the specified id
router.delete('/:noteId', (req, res) => {
    models.Note.destroy({ where: { id: req.params.noteId } })
      .then(() => res.json({}))
      .catch(err => res.status(500).json({ error: err.message }));
});

//Update a note with the specified id
router.put('/:noteId', (req, res) => {
    models.Note.findById(req.params.noteId)
      .then(note => note.update(noteFields(req.body)))
      .then(note => res.json(note))
      .catch(err => res.status(422).json({ error: err.message }));
  });

module.exports = router;
