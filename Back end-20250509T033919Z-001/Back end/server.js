const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const connectDB = require('./config');
const authRoutes = require('./routes/auth');
const branchAuthRoutes = require('./routes/branchAuth');
const franchiseRoutes = require('./routes/franchiseRoutes');
const jobRegistrationRoutes = require('./routes/jobRegistration');
const branchRoutes = require("./routes/branchRoutes");
const menuRoutes = require('./routes/menuRoutes');
const contactRoute = require('./routes/contactRoute');
require('dotenv').config();

const app = express();

connectDB();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type, Authorization',
}));

app.use(bodyParser.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || '366ea2dcf9bea5e0681c86b169c892ffce893103cef7fb54930a37cc5dc6fce6',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === 'production' },
  })
);

app.use('/api/auth', authRoutes);
app.use('/api/branchAuth', branchAuthRoutes);
app.use('/api/franchise', franchiseRoutes);
app.use('/api/job-registration', jobRegistrationRoutes);
app.use('/api/branch-collection', branchRoutes);
app.use('/api', menuRoutes);
app.use('/api/contactForms', contactRoute);

app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
