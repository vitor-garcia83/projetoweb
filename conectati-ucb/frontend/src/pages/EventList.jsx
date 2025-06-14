import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function EventList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
  console.log("Buscando eventos...");
  axios.get('http://localhost:5000/api/events')
    .then(res => {
      console.log(res.data);
      setEvents(res.data);
    })
    .catch(err => {
      console.error("Erro ao buscar eventos:", err);
    });
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
      <div key={ev._id} className="event-card">
        <h3>{ev.title}</h3>
        <p>{new Date(ev.date).toLocaleString()}</p>
        <button onClick={() => inscrever(ev._id)}>Inscrever-se</button>
      </div>
    ))}
  </div>
);

}
