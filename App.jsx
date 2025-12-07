import React, { useState, useEffect } from 'react';
import promptsData from './data/prompts_data_complete.json'; // Tu archivo de datos
import './styles.css'; // Los estilos nuevos

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPrompts, setFilteredPrompts] = useState(promptsData);

  // Efecto de búsqueda
  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const results = promptsData.filter(prompt => 
      prompt.nombre.toLowerCase().includes(term) ||
      prompt.contenido.toLowerCase().includes(term) ||
      (prompt.cuando && prompt.cuando.toLowerCase().includes(term))
    );
    setFilteredPrompts(results);
  }, [searchTerm]);

  // Función Copiar
  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    const btn = document.getElementById(`copy-btn-${index}`);
    if (btn) {
      const originalText = btn.innerText;
      btn.innerText = "✅ ¡Copiado!";
      btn.style.background = "#10b981";
      setTimeout(() => {
        btn.innerText = originalText;
        btn.style.background = ""; // Vuelve al estilo CSS original
      }, 2000);
    }
  };

  return (
    <>
      <a href="https://contador4-0-master.vercel.app/" className="back-btn">
        <span>🏠</span> Volver al HUB
      </a>

      <div className="app-container">
        
        <header className="header">
          <span className="flag-icon">🇲🇽</span>
          <h1>Asistente Tributario SAT</h1>
          <p>Biblioteca de Prompts Especializados | Contador 4.0</p>
        </header>

        <div className="search-container">
          <input 
            type="text" 
            className="search-input" 
            placeholder="🔍 Busca por tema (ej: Resico, CFDI, Deducciones)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="prompts-grid">
          {filteredPrompts.length > 0 ? (
            filteredPrompts.map((prompt, index) => (
              <div key={index} className="prompt-card">
                <div className="card-header">
                  <h3 className="prompt-title">{prompt.nombre}</h3>
                  <div className="meta-tags">
                    {prompt.frecuencia && <span className="badge">{prompt.frecuencia}</span>}
                  </div>
                </div>
                
                <div className="prompt-content">
                  {prompt.contenido}
                </div>

                <div className="actions">
                  <button 
                    id={`copy-btn-${index}`}
                    className="btn btn-copy" 
                    onClick={() => handleCopy(prompt.contenido, index)}
                  >
                    📋 Copiar Prompt
                  </button>
                  
                  <a href="https://chat.openai.com/" target="_blank" rel="noreferrer" className="btn btn-ai">
                    🟢 ChatGPT
                  </a>
                  <a href="https://claude.ai/" target="_blank" rel="noreferrer" className="btn btn-ai">
                    🟠 Claude
                  </a>
                  <a href="https://gemini.google.com/" target="_blank" rel="noreferrer" className="btn btn-ai">
                    🔵 Gemini
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div style={{textAlign: 'center', padding: '40px', color: '#94a3b8'}}>
              No se encontraron prompts con ese término.
            </div>
          )}
        </div>
      </div>

      <div className="footer-wrapper">
        <img src="https://contador4-0-master.vercel.app/personaje-contador.png" alt="Asistente" className="floating-char" />
        <footer className="main-footer">
          <div className="footer-links">
            <a href="https://jairoamaya.co" target="_blank">Sitio Web</a> •
            <a href="https://linkedin.com/in/jairoamaya" target="_blank">LinkedIn</a> •
            <a href="mailto:hola@jairoamaya.co">Contacto</a>
          </div>
          <div style={{color: '#9ca3af', fontSize: '0.9em'}}>
            <p><strong>Contador 4.0 Suite</strong></p>
            <p>Herramienta de productividad diseñada por Jairo Amaya</p>
            <p style={{marginTop: '15px', opacity: 0.6}}>© 2025 Todos los derechos reservados.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
