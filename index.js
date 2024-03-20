const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const favicon = require('serve-favicon');
const path = require('path');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err.message);
  process.exit(1);
});

app.set('view engine', 'ejs');
app.use(express.static('public'));

// Use serve-favicon middleware to serve favicon.ico
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.get('/', (_req, res) => {
  res.render('index');
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
