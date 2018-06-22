const express = require('express');

const { ensureAuthenticated } = require('../utils/authenticate');
const { mongoose } = require('../db/mongoose');
const { Rum } = require('../models/rum');

const router = express.Router();

// GET /
router.get('/', (req, res) => {
  res.render('index', { title: 'Rum Journal' });
});

// GET user rum journal
router.get('/homepage', ensureAuthenticated, (req, res) => {
  res.render('index', { title: 'Rum Journal' });
});

// GET all rums in db to display
router.get('/rums', ensureAuthenticated, async (req, res) => {
  try {
    const rums = await Rum.find({ _creator: req.user._id });
  
    res.send({ rums })
  } catch(e) {
    res.status(400).send(e);
  }
});

module.exports = router;
