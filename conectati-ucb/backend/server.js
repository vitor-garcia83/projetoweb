import express from 'express';
import mongoose from 'mongoose';
import eventRoutes from './routes/eventRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/ucb-events')
  .then(() => console.log('MongoDB connected'));

app.use('/api/events', eventRoutes);
app.use('/api/auth', authRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
