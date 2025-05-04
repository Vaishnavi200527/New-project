import { Router } from 'express';
import { User } from '../models/User';
const router = Router();

// Example test route
router.get('/test', (req, res) => {
  res.json({ message: 'Auth route works!' });
});

// Register route
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone, bloodGroup, aadhaarNumber } = req.body;
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    // Create and save user
    const user = new User({ name, email, password, phone, bloodGroup, aadhaarNumber });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    // For demo, just return user info (no JWT)
    res.json({
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        bloodGroup: user.bloodGroup,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router; 