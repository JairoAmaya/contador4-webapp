import React, { useState, useEffect } from 'react';
// SOLUCIÓN: Ruta absoluta desde la raíz del proyecto
import promptsDataRaw from '/src/data/prompts_data_complete.json'; 
import './styles.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPrompts, setFilteredPrompts] = useState([]);

  // Carga inicial y filtro de búsqueda
  useEffect(() => {
    // Si los datos no son un array, usamos un array vacío para evitar el error
    const data = Array.isArray(promptsDataRaw) ? promptsDataRaw : [];
    
    const term = searchTerm.toLowerCase();
    const results = data.filter(prompt => 
      (prompt.nombre && prompt.nombre.toLowerCase().includes(term)) ||
      (prompt.contenido && prompt.contenido.toLowerCase().includes(term)) ||
      (prompt.cuando && prompt.cuando.toLowerCase().includes(term))
    );
    setFilteredPrompts(results);
  }, [searchTerm]);

  // Función para copiar el prompt
  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    const btn = document.getElementById(`copy-btn-${index}`);
    if (btn) {
      const originalText = btn.innerText;
      btn.innerText = "✅ Copiado";
      btn.style.background = "#10b981"; // Verde éxito
      setTimeout(() => {
        btn.innerText = "📋 Copiar Prompt";
        btn.style.background = ""; 
      }, 2000);
    }
  };

  return (
    <div className="app-wrapper">
      <a href="https://contador4-0-master.vercel.app/" className="back-to-hub">
        <span>🏠</span> Volver al HUB
      </a>

      <div className="app-container">
        
        {/* Header con Identidad SAT */}
        <header className="header">
          <span className="flag-icon">🇲🇽</span>
          <h1>Asistente Tributario SAT</h1>
          <p>Biblioteca de Prompts Especializados | Contador 4.0</p>
        </header>

        {/* Buscador Inteligente */}
        <div className="search-container">
          <input 
            type="text" 
            className="search-input" 
            placeholder="🔍 Busca por tema (ej: Resico, CFDI, Deducciones)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Grid de Resultados */}
        <div className="prompts-grid">
          {filteredPrompts.length > 0 ? (
            filteredPrompts.map((prompt, index) => (
              <div key={index} className="prompt-card">
                <div className="card-header">
                  <h3 className="prompt-title">{prompt.nombre}</h3>
                  <div className="meta-tags">
                    {prompt.frecuencia && <span className="badge frequency">{prompt.frecuencia}</span>}
                    {prompt.cuando && <span className="badge context">📅 {prompt.cuando}</span>}
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
                  
                  {/* Botones de Ejecución IA */}
                  <div className="ai-buttons">
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
              </div>
            ))
          ) : (
            <div className="no-results">
              <p>No encontramos prompts para tu búsqueda.</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer del Ecosistema */}
      <footer class="bp-footer">
        <div class="bp-footer-links">
            <a href="https://jairoamaya.co" target="_blank">Sitio Web</a> •
            <a href="https://linkedin.com/in/jairoamaya" target="_blank">LinkedIn</a> •
            <a href="mailto:hola@jairoamaya.co">Contacto</a>
        </div>
        <div class="bp-footer-branding">
            <p><strong>Contador 4.0 Suite</strong></p>
            <p>Herramienta de productividad diseñada por <a href="https://jairoamaya.co" target="_blank" style="color:#b8c1ec; text-decoration: underline;">Jairo Amaya - Full Stack Marketer</a></p>
        </div>
        <div class="bp-footer-copyright">
            <p>Todos los derechos reservados © 2025.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
