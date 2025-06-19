import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminDashboard() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    topic: '',
    partner: '',
    capacity: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editEventId, setEditEventId] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [selectedEventTitle, setSelectedEventTitle] = useState('');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/events');
      setEvents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/events/${id}`);
      fetchEvents();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditClick = (event) => {
    setForm({
      title: event.title,
      description: event.description,
      date: event.date.slice(0, 10),
      location: event.location,
      topic: event.topic,
      partner: event.partner,
      capacity: event.capacity
    });
    setIsEditing(true);
    setEditEventId(event._id);
  };

  const handleViewRegistrations = async (eventId, eventTitle) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/events/${eventId}/registrations`);
      setRegistrations(res.data);
      setSelectedEventTitle(eventTitle);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`http://localhost:5000/api/events/${editEventId}`, form);
        setIsEditing(false);
        setEditEventId(null);
      } else {
        await axios.post('http://localhost:5000/api/events', form);
      }
      setForm({
        title: '',
        description: '',
        date: '',
        location: '',
        topic: '',
        partner: '',
        capacity: ''
      });
      fetchEvents();
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="admin-container">
      <h2>Painel do Administrador</h2>

      <form onSubmit={handleSubmit} className="admin-form">
        <input type="text" name="title" placeholder="Título" value={form.title} onChange={handleChange} required />
        <input type="text" name="description" placeholder="Descrição" value={form.description} onChange={handleChange} required />
        <input type="date" name="date" value={form.date} onChange={handleChange} required />
        <input type="text" name="location" placeholder="Localização" value={form.location} onChange={handleChange} required />
        <input type="text" name="topic" placeholder="Tema" value={form.topic} onChange={handleChange} />
        <input type="text" name="partner" placeholder="Parceiro" value={form.partner} onChange={handleChange} />
        <input type="number" name="capacity" placeholder="Capacidade" value={form.capacity} onChange={handleChange} required />
        <button type="submit">{isEditing ? 'Salvar Alterações' : 'Criar Evento'}</button>
      </form>

      <div className="event-list-admin">
        <h3>Eventos cadastrados:</h3>
        <ul>
  {events.map(event => (
    <li key={event._id}>
      <span>
        <strong>{event.title}</strong> - {new Date(event.date).toLocaleDateString()}
      </span>
      <div className="event-actions">
        <button onClick={() => handleEditClick(event)} className="btn-edit">Editar</button>
        <button onClick={() => handleDelete(event._id)} className="btn-delete">Excluir</button>
        <button onClick={() => handleViewRegistrations(event._id, event.title)} className="btn-view">Ver Inscritos</button>
      </div>
    </li>
  ))}
</ul>

      </div>

      {registrations.length > 0 && (
        <div className="registrations-list" style={{ marginTop: '2rem', backgroundColor: '#fff', padding: '1rem', borderRadius: '8px' }}>
          <h3>Inscritos no evento: {selectedEventTitle}</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ccc', padding: '8px' }}>Nome</th>
                <th style={{ border: '1px solid #ccc', padding: '8px' }}>Matrícula</th>
                <th style={{ border: '1px solid #ccc', padding: '8px' }}>Email</th>
                <th style={{ border: '1px solid #ccc', padding: '8px' }}>Celular</th>
                <th style={{ border: '1px solid #ccc', padding: '8px' }}>CPF</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((user, index) => (
                <tr key={index}>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>{user.nome}</td>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>{user.matricula}</td>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>{user.email}</td>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>{user.celular}</td>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>{user.cpf}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
