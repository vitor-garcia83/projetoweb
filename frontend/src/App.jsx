// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import EventList from './pages/EventList.jsx';
import RegisterForm from './pages/RegisterForm.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import './index.css';

export default function App() {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const navigate = useNavigate();

  const handleLoginClick = () => {
    setShowLoginForm(true);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    if (username === 'admin' && password === '1234') {
      alert('Login de administrador bem-sucedido!');
      setShowLoginForm(false);
      setUsername('');
      setPassword('');
      setLoginError('');
      navigate('/admin');
    } else {
      setLoginError('Usuário ou senha inválidos');
    }
  };

  return (
    <div className="container">
      <header className="header">
        <div className="header-left"></div>

        <div className="header-center">
          <h1>ConectaTI UCB</h1>
          <nav>
            <Link to="/" style={{ color: 'white' }}>Eventos Disponíveis</Link>
          </nav>
        </div>

        <div className="header-right">
          <button onClick={handleLoginClick}>Login Admin</button>
        </div>
      </header>

      {showLoginForm && (
        <div style={{ margin: '1rem 0', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
          <form onSubmit={handleLoginSubmit}>
            <div>
              <label>Usuário:</label><br />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Senha:</label><br />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
            <button type="submit" style={{ marginTop: '0.5rem' }}>Entrar</button>
          </form>
        </div>
      )}

      <main>
        <Routes>
          <Route path="/" element={<EventList />} />
          <Route path="/registrar/:eventId" element={<RegisterForm />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>

      <footer className="footer">
        <p>&copy; 2025 ConectaTI UCB - Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
