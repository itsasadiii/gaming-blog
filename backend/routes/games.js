const express = require('express');
const router = express.Router();
const Game = require('../models/Game');

// Get all games
router.get('/', async (req, res) => {
  try {
    const { genre, platform, sort } = req.query;
    let query = {};

    if (genre) query.genre = genre;
    if (platform) query.platform = platform;

    let games = Game.find(query);

    if (sort === 'newest') {
      games = games.sort({ releaseDate: -1 });
    } else if (sort === 'rating') {
      games = games.sort({ rating: -1 });
    } else if (sort === 'price') {
      games = games.sort({ price: 1 });
    }

    const result = await games.limit(50);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single game
router.get('/:id', async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) return res.status(404).json({ message: 'Game not found' });
    res.json(game);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create game (admin only)
router.post('/', async (req, res) => {
  const game = new Game(req.body);
  try {
    const newGame = await game.save();
    res.status(201).json(newGame);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update game (admin only)
router.put('/:id', async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) return res.status(404).json({ message: 'Game not found' });

    Object.assign(game, req.body);
    const updatedGame = await game.save();
    res.json(updatedGame);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete game (admin only)
router.delete('/:id', async (req, res) => {
  try {
    const game = await Game.findByIdAndDelete(req.params.id);
    if (!game) return res.status(404).json({ message: 'Game not found' });
    res.json({ message: 'Game deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
