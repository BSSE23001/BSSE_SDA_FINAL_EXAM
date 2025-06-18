const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const StudentRoutes = require('./routes/StudentRoutes');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));  // ADDED CORS CONFIG
app.use(bodyParser.json());
app.use(express.static('public'));  // SERVING STATIC FILES FIRST

// Connect to database
connectDB();

// API Routes
app.use('/api/Students', StudentRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Frontend: http://localhost:${port}/index.html`);
});
