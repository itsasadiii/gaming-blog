const express = require('express');
const router = express.Router();
const News = require('../models/News');

// Get all news articles
router.get('/', async (req, res) => {
  try {
    const { category, featured } = req.query;
    let query = {};

    if (category) query.category = category;
    if (featured === 'true') query.featured = true;

    const articles = await News.find(query)
      .sort({ createdAt: -1 })
      .limit(50);
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single article
router.get('/:id', async (req, res) => {
  try {
    const article = await News.findById(req.params.id);
    if (!article) return res.status(404).json({ message: 'Article not found' });
    
    // Increment views
    article.views += 1;
    await article.save();
    
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create article (admin only)
router.post('/', async (req, res) => {
  const article = new News(req.body);
  try {
    const newArticle = await article.save();
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update article (admin only)
router.put('/:id', async (req, res) => {
  try {
    const article = await News.findById(req.params.id);
    if (!article) return res.status(404).json({ message: 'Article not found' });

    Object.assign(article, req.body);
    const updatedArticle = await article.save();
    res.json(updatedArticle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete article (admin only)
router.delete('/:id', async (req, res) => {
  try {
    const article = await News.findByIdAndDelete(req.params.id);
    if (!article) return res.status(404).json({ message: 'Article not found' });
    res.json({ message: 'Article deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
