import express from 'express';
const router = express.Router();

router.post('/login', (req, res) => {
  // Simula login
  res.json({ token: 'fake-jwt-token', role: 'user' });
});

export default router;