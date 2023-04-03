const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const db = require('./config/db.config');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');

// Use body-parser to parse requests as JSON
app.use(bodyParser.json());
app.use(express.json());

// Enable CORS for all requests
app.use(cors());

// // Use  middleware for all routes under /api
// app.use('/api', auth);

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the ToDo API.' });
});

// User routes
app.use('/api/users', userRoutes);

// Task routes
app.use('/api/tasks', taskRoutes);

// Handle 404 errors
app.use(function(req, res, next) {
  res.status(404).send({ message: 'Route '+req.url+' Not found.' });
});

// Handle server errors
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send({ message: 'Internal Server Error' });
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});
