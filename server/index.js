const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const facilitiesRouter = require('./routes/facilities');
const bookingsRouter = require('./routes/bookings');
const authRouter = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'https://sportnest-client.vercel.app'],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/facilities', facilitiesRouter);
app.use('/api/bookings', bookingsRouter);
app.use('/api/auth', authRouter);

app.get('/', (req, res) => {
  res.json({ message: 'SportNest API is running!', status: 'ok' });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`SportNest server running on port ${PORT}`);
});
