import React from 'react';
import EventList from './pages/EventList.jsx';
import './index.css';

export default function App() {
  return (
    <div className="container">
      <header className="header">
        <h1>ConectaTI UCB</h1>
      </header>

      <main>
        <h2>Eventos Disponíveis</h2>
        <EventList />
      </main>

      <footer className="footer">
        <p>&copy; 2025 ConectaTI UCB - Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
