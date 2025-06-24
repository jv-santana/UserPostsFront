<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Documentação da API - João Victor</title>
    <style>
      :root {
        --blue: #1d4ed8;
        --blue-dark: #1e3a8a;
        --light: #f1f5f9;
        --dark: #0f172a;
        --gray: #64748b;
        --radius: 10px;
        --transition: 0.3s ease;
      }

      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background-color: var(--light);
        color: var(--dark);
      }

      .container {
        max-width: 960px;
        margin: auto;
        padding: 2rem;
      }

      header {
        text-align: center;
        margin-bottom: 3rem;
      }

      header h1 {
        font-size: 2.5rem;
        color: var(--blue);
      }

      header p {
        color: var(--gray);
      }

      .base-url {
        background: var(--dark);
        color: white;
        padding: 1rem;
        border-radius: var(--radius);
        font-family: monospace;
        text-align: center;
        margin-bottom: 2rem;
      }

      .tabs {
        display: flex;
        gap: 1rem;
        margin-bottom: 2rem;
        justify-content: center;
        flex-wrap: wrap;
      }

      .tab {
        padding: 0.75rem 1.5rem;
        background: transparent;
        border: 2px solid var(--blue);
        border-radius: var(--radius);
        color: var(--blue);
        cursor: pointer;
        transition: var(--transition);
      }

      .tab:hover,
      .tab.active {
        background: var(--blue);
        color: white;
      }

      .endpoints-section {
        display: none;
      }

      .endpoints-section.active {
        display: block;
      }

      .card {
        background: white;
        border-radius: var(--radius);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        margin-bottom: 1.5rem;
        overflow: hidden;
      }

      .card-header {
        background: var(--light);
        padding: 1rem 1.5rem;
        border-bottom: 1px solid #e2e8f0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
      }

      .badge {
        padding: 0.4rem 0.8rem;
        border-radius: 5px;
        font-size: 0.8rem;
        font-weight: bold;
        color: white;
        min-width: 60px;
        text-align: center;
      }

      .get { background: #0ea5e9; }
      .post { background: #10b981; }
      .put { background: #facc15; color: black; }
      .delete { background: #ef4444; }

      .path {
        font-family: monospace;
        font-size: 1rem;
      }

      .desc {
        font-style: italic;
        color: var(--gray);
      }

      .card-body {
        padding: 1rem 1.5rem;
      }

      .section-label {
        font-weight: bold;
        margin-top: 1rem;
      }

      .code {
        background: #1e293b;
        color: #f8fafc;
        padding: 1rem;
        border-radius: 5px;
        font-family: monospace;
        font-size: 0.9rem;
        overflow-x: auto;
        margin-top: 0.5rem;
      }

      footer {
        text-align: center;
        margin-top: 3rem;
        padding-top: 2rem;
        border-top: 1px solid #e2e8f0;
        color: var(--gray);
      }

      .stack {
        margin-top: 1rem;
        display: flex;
        justify-content: center;
        gap: 0.5rem;
        flex-wrap: wrap;
      }

      .tech {
        padding: 0.4rem 1rem;
        border-radius: 15px;
        background: var(--light);
        border: 1px solid var(--gray);
        font-size: 0.85rem;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <header>
        <h1>Documentação da API</h1>
        <p>CRUD de Usuários e Posts | @JoaoVictor</p>
      </header>


      <div class="tabs">
        <button class="tab active" onclick="showTab('users')">Usuários</button>
        <button class="tab" onclick="showTab('posts')">Posts</button>
      </div>

      <section id="users" class="endpoints-section active">
        <!-- Usuários -->
      </section>

      <section id="posts" class="endpoints-section">
        <!-- Posts -->
      </section>

      <footer>
        <p>Desenvolvido por João Victor - API com Node.js & Prisma</p>
        <div class="stack">
          <span class="tech">Node.js</span>
          <span class="tech">Express</span>
          <span class="tech">TypeScript</span>
          <span class="tech">Vercel</span>
        </div>
      </footer>
    </div>

    <script>
      function showTab(tabName) {
        document.querySelectorAll('.tab').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.endpoints-section').forEach(sec => sec.classList.remove('active'));
        event.target.classList.add('active');
        document.getElementById(tabName).classList.add('active');
      }
    </script>
  </body>
</html>
