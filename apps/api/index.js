const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('📚 PropScholar Help Center API running!');
});

// 🟩 Get all categories
app.get('/categories', async (req, res) => {
  const categories = await prisma.category.findMany({
    include: { articles: true },
  });
  res.json(categories);
});

// 🟨 Get all articles
app.get('/articles', async (req, res) => {
  const articles = await prisma.article.findMany({
    include: { category: true, author: true },
  });
  res.json(articles);
});

// 🟦 Get article by slug
app.get('/articles/:slug', async (req, res) => {
  const article = await prisma.article.findUnique({
    where: { slug: req.params.slug },
    include: { category: true, author: true },
  });
  if (!article) return res.status(404).json({ error: 'Not found' });
  res.json(article);
});

// 🟧 Submit feedback
app.post('/feedback', async (req, res) => {
  const { articleId, isHelpful, comment } = req.body;
  try {
    const feedback = await prisma.feedback.create({
      data: { articleId, isHelpful, comment },
    });
    res.json(feedback);
  } catch (err) {
    res.status(500).json({ error: 'Feedback failed', details: err.message });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`✅ Server listening on port ${PORT}`);
});
