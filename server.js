const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get('/search/users', (req, res) => {
  res.json({ items: [] });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
