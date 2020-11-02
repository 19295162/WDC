const express = require('express');
const _ = require('lodash');
const models = require('../models');

const router = express.Router();

// Selects only the fields that are allowed to be set by users
function notebookFields(obj) {
  return _.pick(obj, ['title']);
}

// Index
router.get('/', (req, res) => {
  models.Notebook.findAll({ order: [['createdAt', 'DESC']] })
    .then(notebooks => res.json(notebooks))
    .catch(err => res.status(500).json({ error: err.message }));
});

//Get a list of notes from the specified notebook
router.get('/:notebookId/notes', (req, res) => {
  models.Note.findAll({ where: {notebookId: req.params.notebookId}})
    .then(notes => res.json(notes))
    .catch(err => res.status(500).json({ error: err.message }));
});

//Create a new notebook with posted data and return it
router.post('/', (req, res) => {
  models.Notebook.create(notebookFields(req.body))
    .then(notebook => res.json(notebook))
    .catch(err => res.status(422).json({ error: err.message }));
});
  
//Return a notebook with the specified id
router.get('/:notebookId', (req, res) => {
  models.Notebook.findById(req.params.notebookId)
    .then(notebook => res.json(notebook))
    .catch(err => res.status(500).json({ error: err.message }));
});

//Delete a notebook with the specified id
// TODO: also delete all notes for that notebook
router.delete('/:notebookId', (req, res) => {
  models.Notebook.destroy({ where: { id: req.params.notebookId } })
    .then(() => res.json({}))
    .catch(err => res.status(500).json({ error: err.message }));
});

//Update a notebook with the specified id
router.put('/:notebookId', (req, res) => {
  models.Notebook.findById(req.params.notebookId)
    .then(notebook => notebook.update(notebookFields(req.body)))
    .then(notebook => res.json(notebook))
    .catch(err => res.status(422).json({ error: err.message }));
});

module.exports = router;
