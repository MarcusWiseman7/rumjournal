const express = require('express');
const { ObjectId } = require('mongodb');

const { ensureAuthenticated } = require('../utils/authenticate');
const { mongoose } = require('../db/mongoose');
const { Rum } = require('../models/rum');

const router = express.Router();

// POST new rum to db
router.post('/', ensureAuthenticated, async (req, res) => {
  const rum = new Rum(req.body);
  
  rum.set({ _creator: req.user._id });

  try {
    await rum.save();
    res.redirect('/homepage');
  } catch(e) {
    res.status(400).send(e);
  }
});

// GET rum by id to edit/show
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  
  if (!ObjectId.isValid(id)) return res.status(404).send();

  try {
    const rum = await Rum.findById(id);

    if (!rum) return res.status(404).send();

    res.send({ rum });
  } catch(e) {
    res.status(400).send(e);
  }
});

// DELETE rum from db
router.delete('/:id', async (req, res) => {
  const id = req.params.id;

  if (!ObjectId.isValid(id)) return res.status(404).send();

  try {
    const rum = await Rum.findByIdAndRemove(id);
    
    if (!rum) return res.status(404).send();

    res.send({ rum });
  } catch(e) {
    res.status(400).send(e);
  }
});

// PATCH update rum in db
router.patch('/:id', async (req, res) => {
  const id = req.params.id;
  
  if (!ObjectId.isValid(id)) return res.status(404).send();

  try {
    const rum = await Rum.findByIdAndUpdate(id, { $set: req.body }, { new: true });
    
    if (!rum) return res.status(404).send();

    res.send({ rum });
  } catch(e) {
    res.status(400).send(e);
  }
});

module.exports = router;
