import express from 'express';
import Event from '../models/Event.js';
const router = express.Router();

router.get('/', async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

router.post('/:id/register', async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event.registeredUsers.includes(req.body.email)) {
    event.registeredUsers.push(req.body.email);
    await event.save();
  }
  res.json({ message: 'Inscrição confirmada' });
});

export default router;