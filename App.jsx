@import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Poppins:wght@700;800&display=swap');

:root {
  --bg-dark: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
  --card-bg: rgba(255, 255, 255, 0.05);
  --border-color: rgba(255, 255, 255, 0.1);
  --text-primary: #e2e8f0;
  --accent-color: #667eea;
}

body {
  margin: 0;
  font-family: 'Lato', sans-serif;
  background: var(--bg-dark);
  color: var(--text-primary);
  min-height: 100vh;
}

.app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 80px 20px 40px; /* Padding superior para el botón de volver */
  flex: 1;
}

/* Botón Volver */
.back-to-hub {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 100;
  background: rgba(0,0,0,0.6);
  backdrop-filter: blur(5px);
  padding: 8px 16px;
  border-radius: 50px;
  color: white;
  text-decoration: none;
  border: 1px solid var(--border-color);
  font-size: 0.9rem;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 8px;
}
.back-to-hub:hover { background: #2563eb; border-color: #2563eb; }

/* Header */
.header {
  text-align: center;
  margin-bottom: 40px;
  padding: 40px;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.3);
}
.header-icon { font-size: 3rem; margin-bottom: 10px; display: block; }
.header h1 {
  font-family: 'Poppins', sans-serif;
  font-size: 2.2rem;
  font-weight: 800;
  margin: 0;
  background: linear-gradient(135deg, #ffffff 0%, #a8b3ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.header p { color: #94a3b8; margin-top: 10px; font-size: 1.1rem; }

/* Buscador */
.search-container { margin-bottom: 30px; position: sticky; top: 20px; z-index: 50; }
.search-input {
  width: 100%;
  padding: 15px 20px;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  background: rgba(15, 23, 42, 0.9);
  color: white;
  font-size: 1rem;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
  transition: border-color 0.3s;
}
.search-input:focus { outline: none; border-color: var(--accent-color); }

/* Tarjetas */
.prompts-grid { display: flex; flex-direction: column; gap: 20px; }
.prompt-card {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 25px;
  transition: transform 0.2s;
}
.prompt-card:hover { transform: translateY(-2px); background: rgba(255,255,255,0.08); }

.card-header { margin-bottom: 15px; }
.prompt-title {
  font-family: 'Poppins', sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
  color: white;
  margin: 0 0 10px 0;
}
.meta-tags { display: flex; gap: 10px; flex-wrap: wrap; }
.badge {
  font-size: 0.8rem;
  padding: 4px 8px;
  border-radius: 4px;
}
.badge.frequency { background: rgba(59, 130, 246, 0.2); color: #60a5fa; border: 1px solid rgba(59, 130, 246, 0.3); }
.badge.context { background: rgba(234, 179, 8, 0.2); color: #facc15; border: 1px solid rgba(234, 179, 8, 0.3); }

.prompt-content {
  background: rgba(0,0,0,0.3);
  padding: 15px;
  border-radius: 8px;
  font-family: monospace;
  font-size: 0.9rem;
  color: #cbd5e1;
  white-space: pre-wrap;
  margin-bottom: 20px;
  border: 1px solid rgba(255,255,255,0.05);
}

/* Botones */
.actions { display: flex; gap: 10px; flex-wrap: wrap; }
.btn {
  padding: 10px 16px;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  font-size: 0.9rem;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  transition: all 0.2s;
}
.btn-copy {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  flex: 1;
}
.btn-copy:hover { filter: brightness(1.1); }

.ai-buttons { display: flex; gap: 8px; flex: 1; }
.btn-ai {
  background: rgba(255,255,255,0.05);
  border: 1px solid var(--border-color);
  color: #94a3b8;
  flex: 1;
}
.btn-ai:hover { background: rgba(255,255,255,0.1); color: white; }

.no-results { text-align: center; color: #64748b; padding: 40px; }

/* Footer Styles */
.bp-footer {
    text-align: center;
    padding: 40px 20px;
    background: rgba(0, 0, 0, 0.4);
    border-top: 1px solid var(--border-color);
    margin-top: auto;
}
.bp-footer-links a { color: #a8b3ff; margin: 0 10px; text-decoration: none; }
.bp-footer-branding p { margin: 5px 0; color: #64748b; font-size: 0.9rem; }
.bp-footer-copyright p { color: #475569; font-size: 0.8rem; margin-top: 15px; }

@media (max-width: 768px) {
  .actions { flex-direction: column; }
  .ai-buttons { width: 100%; }
}
