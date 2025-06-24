import React from 'react';

export default function Home() {
  return (
    <div className="container">
      <header>
        <h1>Documentação da API</h1>
        <p>CRUD de Usuários e Posts</p>
      </header>

      <div className="tabs">
        <button className="tab active" onClick={(e) => showTab(e, 'users')}>Usuários</button>
        <button className="tab" onClick={(e) => showTab(e, 'posts')}>Posts</button>
      </div>

      <section id="users" className="endpoints-section active">
        {/* Usuários */}
      </section>

      <section id="posts" className="endpoints-section">
        {/* Posts */}
      </section>
    </div>
  );
}

function showTab(event: React.MouseEvent<HTMLButtonElement>, tabName: string) {
  const tabs = document.querySelectorAll('.tab');
  const sections = document.querySelectorAll('.endpoints-section');
  tabs.forEach(tab => tab.classList.remove('active'));
  sections.forEach(section => section.classList.remove('active'));

  const clickedButton = event.currentTarget;
  clickedButton.classList.add('active');

  const targetSection = document.getElementById(tabName);
  targetSection?.classList.add('active');
}
