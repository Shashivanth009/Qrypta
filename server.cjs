const express = require('express');

const app = express();
const port = 3001;

app.get('/api/certificateHistory', async (req, res) => {
  try {
    const { getCertificateHistory } = await import('./dist/api/certificateHistory.js');
    const history = await getCertificateHistory();
    res.json(history);
  } catch (error) {
    console.error('Error fetching certificate history:', error);
    res.status(500).json({ error: 'Failed to fetch certificate history' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
