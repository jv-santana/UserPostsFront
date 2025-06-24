export default function Home() {
  return (
    <div className="container">
      <header>
        <h1>Documentação da API</h1>
        <p>CRUD de Usuários e Posts | @JoaoVictor</p>
      </header>

      <div className="tabs">
        <button className="tab active" onClick={() => showTab('users')}>Usuários</button>
        <button className="tab" onClick={() => showTab('posts')}>Posts</button>
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

// Função JS inline
function showTab(tabName: string) {
  const tabs = document.querySelectorAll('.tab');
  const sections = document.querySelectorAll('.endpoints-section');
  tabs.forEach(tab => tab.classList.remove('active'));
  sections.forEach(section => section.classList.remove('active'));

  const clickedButton = event?.target as HTMLElement;
  clickedButton?.classList.add('active');

  const targetSection = document.getElementById(tabName);
  targetSection?.classList.add('active');
}
