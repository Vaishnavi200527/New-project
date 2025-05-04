import express from 'express';

import cors from 'cors';

import mongoose from 'mongoose';

import dotenv from 'dotenv';

import authRoutes from './routes/auth.routes';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5001;

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://2023taniyanagdev:2023taniyanagdev@apnablood.uz1wnw0.mongodb.net/apnablood?retryWrites=true&w=majority&appName=apnablood';

// Middleware

app.use(cors({

origin: ['http://localhost:5173', 'http://localhost:5000'],

credentials: true

}));

app.use(express.json());

// Routes

app.use('/api/auth', authRoutes);

// Test route

app.get('/', (req, res) => {

res.json({ message: 'ApnaBlood API is running' });

});

// Connect to MongoDB

mongoose

.connect(MONGODB_URI)

.then(() => {

console.log('Connected to MongoDB');

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


})

.catch((error) => {

console.error('MongoDB connection error:', error);

process.exit(1);

});