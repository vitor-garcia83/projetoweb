import express from 'express';
import Event from '../models/Event.js';
import User from '../models/User.js';

const router = express.Router();

// Listar todos os eventos
router.get('/', async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

// Criar novo evento
router.post('/', async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.json({ message: 'Evento criado com sucesso' });
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar evento' });
  }
});

// Atualizar evento
router.put('/:id', async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: 'Evento atualizado com sucesso', event: updatedEvent });
  } catch (error) {
    res.status(400).json({ error: 'Erro ao atualizar evento' });
  }
});

// Excluir evento
router.delete('/:id', async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Evento excluído com sucesso' });
  } catch (error) {
    res.status(400).json({ error: 'Erro ao excluir evento' });
  }
});

// Inscrição de usuário (email)
router.post('/:id/register', async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event.registeredUsers.includes(req.body.email)) {
    event.registeredUsers.push(req.body.email);
    await event.save();
  }
  res.json({ message: 'Inscrição confirmada' });
});

// Listar detalhes dos inscritos de um evento
router.get('/:id/registrations', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ error: 'Evento não encontrado' });
    }

    const users = await User.find({ email: { $in: event.registeredUsers } });

    res.json(users);
  } catch (error) {
    console.error('Erro ao buscar inscrições:', error);
    res.status(500).json({ error: 'Erro interno ao buscar inscrições' });
  }
});

export default router;
