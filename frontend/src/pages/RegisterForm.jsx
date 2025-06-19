import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function RegisterForm() {
  const { eventId } = useParams();
  const [form, setForm] = useState({
    matricula: '',
    nome: '',
    email: '',
    celular: '',
    cpf: ''
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const userRes = await fetch('http://localhost:5000/api/auth/register-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, password: 'conectati2025' }) // senha padrão incluída aqui
      });

      if (!userRes.ok) {
        const error = await userRes.json();
        alert(error.error || 'Erro ao registrar usuário');
        return;
      }

      const eventRes = await fetch(`http://localhost:5000/api/events/${eventId}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email })
      });

      if (!eventRes.ok) {
        alert('Erro ao registrar inscrição no evento');
        return;
      }

      alert('Inscrição realizada com sucesso!');
    } catch (err) {
      alert('Erro ao registrar inscrição');
    }
  };

  return (
    <div className="event-card">
      <h2>Registro no Evento</h2>
      <form onSubmit={handleSubmit} className="form-register">
        <input name="matricula" placeholder="Matrícula" value={form.matricula} onChange={handleChange} required />
        <input name="nome" placeholder="Nome" value={form.nome} onChange={handleChange} required />
        <input name="email" placeholder="Email" type="email" value={form.email} onChange={handleChange} required />
        <input name="celular" placeholder="Celular" value={form.celular} onChange={handleChange} required />
        <input name="cpf" placeholder="CPF" value={form.cpf} onChange={handleChange} required />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}
