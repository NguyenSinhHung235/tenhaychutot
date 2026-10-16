import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { generatePureVietnameseNamesWithGemini, analyzeCustomNameWithGemini } from './server/geminiService';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// API endpoints
app.post('/api/generate-names', async (req, res) => {
  try {
    const results = await generatePureVietnameseNamesWithGemini(req.body);
    res.json({ success: true, data: results });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message || 'Lỗi khi gọi Gemini' });
  }
});

app.post('/api/analyze-name', async (req, res) => {
  try {
    const result = await analyzeCustomNameWithGemini(req.body.name, req.body.surname);
    res.json({ success: true, data: result });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message || 'Lỗi phân tích' });
  }
});

// Serve static frontend files from dist in production
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
