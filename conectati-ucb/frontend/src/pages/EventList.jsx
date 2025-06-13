import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function EventList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/events')
      .then(res => setEvents(res.data))
      .catch(err => console.error(err));
  }, []);

  function inscrever(eventId) {
    axios.post(`http://localhost:5000/api/events/${eventId}/register`, {
      email: 'usuario@ucb.br'
    }).then(() => {
      alert('Inscrição confirmada');
    });
  }

  return (
    <div>
      <h2>Eventos Disponíveis</h2>
      {events.map(ev => (
        <div key={ev._id}>
          <h3>{ev.title}</h3>
          <p>{new Date(ev.date).toLocaleString()}</p>
          <button onClick={() => inscrever(ev._id)}>Inscrever-se</button>
        </div>
      ))}
    </div>
  );
}
