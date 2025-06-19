import express from 'express';
import User from '../models/User.js'; // importa o model correto

const router = express.Router();

router.post('/register-user', async (req, res) => {
  try {
    const user = new User(req.body); // usa o model User
    await user.save();
    res.json({ message: 'Usuário registrado com sucesso!' });
  } catch (error) {
    res.status(400).json({ error: 'Erro ao registrar usuário' });
  }
});

export default router;
