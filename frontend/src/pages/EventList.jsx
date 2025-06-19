import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function EventList() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/events')
      .then(res => setEvents(res.data))
      .catch(err => console.error("Erro ao buscar eventos:", err));
  }, []);

  function inscrever(eventId) {
    axios.post(`http://localhost:5000/api/events/${eventId}/register`, {
      email: 'usuario@ucb.br'
    }).then(() => {
      alert('Inscrição confirmada');
    }).catch(() => {
      alert('Erro ao se inscrever');
    });
  }

  function irParaFormulario(eventId) {
    navigate(`/registrar/${eventId}`);
  }

  return (
    <div className="event-grid">
      {events.map(ev => (
        <div key={ev._id} className="event-card">
          {ev.imageUrl && (
            <img
              src={ev.imageUrl}
              alt={ev.title}
              style={{ width: '100%', borderRadius: '8px', marginBottom: '10px' }}
            />
          )}
          <h3>{ev.title}</h3>
          <p><strong>Data:</strong> {new Date(ev.date).toLocaleString()}</p>
          <p><strong>Descrição:</strong> {ev.description}</p>
          <p><strong>Local:</strong> {ev.location}</p>
          <p><strong>Tema:</strong> {ev.topic}</p>
          <p><strong>Parceiro:</strong> {ev.partner}</p>
          <p><strong>Capacidade:</strong> {ev.capacity}</p>
          <p><strong>Inscritos:</strong> {ev.registeredUsers?.length || 0}</p>

          <button onClick={() => irParaFormulario(ev._id)}>Inscrever-se</button>

        </div>
      ))}
    </div>
  );
}
