const express = require('express');
const router = express.Router();
const Hero = require('../models/Hero');

// getting all
router.get('/', async (req, res) => {
  try {
    const heroes = await Hero.find();
    res.json(heroes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// getting one
router.get('/:id', getHero, (req, res) => {
  res.send(res.hero);
});

// creating one
router.post('/', async (req, res) => {
  const hero = new Hero({
    id: req.body.id,
    picture: req.body.picture,
    name: req.body.name,
    rank: req.body.rank,
  });

  try {
    const newHero = await hero.save();
    res.status(201).json(newHero);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// updating one
router.patch('/', getHero, async (req, res) => {
  if (req.body.name != null) {
    res.hero.name = req.body.name;
  }
  if (req.body.email != null) {
    res.hero.email = req.body.email;
  }
  try {
    const updatedHero = await res.subscriber.save();
    res.json(updatedHero);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// deleting one
router.delete('/:id', getHero, async (req, res) => {
  try {
    await res.hero.remove();
    res.json({ message: 'Hero excluded' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getHero(req, res, next) {
  let hero;
  try {
    hero = await Hero.findOne({ id: req.params.id });
    if (hero == null) {
      return res.status(404).json({ message: 'Hero not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.hero = hero;
  next();
}

module.exports = router;
