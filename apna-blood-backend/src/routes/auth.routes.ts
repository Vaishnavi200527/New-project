import { Router } from 'express';
const router = Router();

// Example test route
router.get('/test', (req, res) => {
  res.json({ message: 'Auth route works!' });
});

// Register route
router.post('/register', (req, res) => {
  // In a real app, you would save the user to the database here
  res.status(201).json({ message: 'User registered successfully' });
});

export default router; 