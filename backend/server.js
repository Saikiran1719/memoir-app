const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET','POST','PUT','DELETE'],
  allowedHeaders: ['Content-Type','Authorization']
}));
app.use(express.json());

// Routes
app.use('/api/auth',   require('./routes/auth'));
app.use('/api/movies', require('./routes/movies'));
app.use('/api/books',  require('./routes/books'));
app.use('/api/diary',  require('./routes/diary'));
app.use('/api/webseries', require('./routes/webseries'));


// Health check
app.get('/', (req, res) => res.json({ message: 'Memoir API running ✅' }));

// Start
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected ✅');
    app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
  })
  .catch(err => console.error('MongoDB connection failed ❌', err.message));