const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());

// API route
app.get('/api/employees', (req, res) => {
  const filePath = path.join(__dirname, 'employees.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Unable to read file' });
    }

    res.json(JSON.parse(data));
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});