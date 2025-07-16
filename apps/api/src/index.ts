import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());

const faqs = [
  { question: "Is news trading allowed?", answer: "No, news trading is restricted..." },
  { question: "What is daily drawdown?", answer: "It's calculated based on..." }
];

app.get('/faqs', (_req, res) => {
  res.json(faqs);
});

app.listen(PORT, () => {
  console.log(`✅ Server listening on port ${PORT}`);
});

