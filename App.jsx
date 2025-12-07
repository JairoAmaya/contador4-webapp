import React, { useState, useEffect } from 'react';
import promptsDataList from './data/prompts_data_complete.json'; // Asegúrate de que este archivo tenga la estructura anidada (Categorías)

function App() {
  // Estados para la selección
  const [categories, setCategories] = useState([]);
  const [selectedCatIndex, setSelectedCatIndex] = useState('');
  const [selectedSubIndex, setSelectedSubIndex] = useState('');
  const [selectedPromptIndex, setSelectedPromptIndex] = useState('');
  
  // Estados para el prompt y variables
  const [currentPromptTemplate, setCurrentPromptTemplate] = useState('');
  const [dynamicInputs, setDynamicInputs] = useState({});
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  
  // Estado para UI
  const [copyStatus, setCopyStatus] = useState('Copiar Prompt');

  // 1. Cargar Categorías al inicio
  useEffect(() => {
    // Asumimos que promptsDataList es el array de categorías que usabas en el código anterior
    setCategories(promptsDataList);
  }, []);

  // 2. Manejar cambio de Categoría
  const handleCategoryChange = (e) => {
    const index = e.target.value;
    setSelectedCatIndex(index);
    setSelectedSubIndex('');
    setSelectedPromptIndex('');
    setCurrentPromptTemplate('');
    setGeneratedPrompt('');
    setDynamicInputs({});
  };

  // 3. Manejar cambio de Subcategoría
  const handleSubcatChange = (e) => {
    const index = e.target.value;
    setSelectedSubIndex(index);
    setSelectedPromptIndex('');
    setCurrentPromptTemplate('');
    setGeneratedPrompt('');
    setDynamicInputs({});
  };

  // 4. Manejar selección de Prompt
  const handlePromptChange = (e) => {
    const index = e.target.value;
    setSelectedPromptIndex(index);
    
    if (index !== '') {
      const promptText = categories[selectedCatIndex]
        .subcategories[selectedSubIndex]
        .prompts[index].prompt;
        
      setCurrentPromptTemplate(promptText);
      extractVariables(promptText);
      setGeneratedPrompt('');
    }
  };

  // 5. Extraer variables [entre corchetes]
  const extractVariables = (text) => {
    const regex = /\[([^\]]+)\]/g;
    const matches = [...new Set(text.match(regex) || [])];
    
    const newInputs = {};
    matches.forEach(match => {
      newInputs[match] = ''; // Inicializar vacío
    });
    setDynamicInputs(newInputs);
  };

  // 6. Manejar cambios en los inputs dinámicos
  const handleInputChange = (variable, value) => {
    setDynamicInputs(prev => ({
      ...prev,
      [variable]: value
    }));
  };

  // 7. Generar Prompt Final
  const handleGenerate = () => {
    let finalText = currentPromptTemplate;
    
    Object.keys(dynamicInputs).forEach(key => {
      const value = dynamicInputs[key].trim();
      // Si el usuario escribió algo, reemplazar. Si no, dejar el placeholder original o quitar corchetes.
      const replacement = value !== '' ? value : key; 
      // Escapar corchetes para el replace global
      const safeKey = key.replace(/\[/g, '\\[').replace(/\]/g, '\\]');
      const regex = new RegExp(safeKey, 'g');
      finalText = finalText.replace(regex, replacement);
    });

    setGeneratedPrompt(finalText);
  };

  // 8. Copiar al portapapeles
  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setCopyStatus('¡Copiado! 👍');
    setTimeout(() => setCopyStatus('Copiar Prompt'), 2000);
  };

  // 9. Ejecutar en IA
  const handleExecute = (url) => {
    navigator.clipboard.writeText(generatedPrompt);
    window.open(url, '_blank');
  };

  // Helper para resaltar corchetes en la vista previa
  const renderHighlightedPreview = (text) => {
    if (!text) return 'Selecciona una tarea para ver la plantilla...';
    
    const parts = text.split(/(\[[^\]]+\])/g);
    return parts.map((part, index) => 
      part.match(/^\[[^\]]+\]$/) 
        ? <span key={index} className="bracket-highlight">{part}</span> 
        : part
    );
  };

  return (
    <div className="app-wrapper">
      
      {/* Botón Volver */}
      <a href="https://contador4-0-master.vercel.app/" className="back-to-hub">
        <span>🏠</span> Volver al HUB
      </a>

      <div className="console-container">
        
        {/* Header */}
        <div className="header-section">
          <img src="https://jairoamaya.co/wp-content/uploads/2025/12/Icono-contador-4.0.jpg" alt="Logo" className="app-logo" />
          <h1>Contador 4.0 Express</h1>
          <p style={{color: '#94a3b8'}}>Generador de Prompts de Alta Ingeniería</p>
        </div>

        {/* Selectores */}
        <div className="form-group">
          <label>Categoría</label>
          <select value={selectedCatIndex} onChange={handleCategoryChange}>
            <option value="">-- Selecciona una Categoría --</option>
            {categories.map((cat, index) => (
              <option key={index} value={index}>{cat.title}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Subcategoría</label>
          <select value={selectedSubIndex} onChange={handleSubcatChange} disabled={selectedCatIndex === ''}>
            <option value="">-- Selecciona una Subcategoría --</option>
            {selectedCatIndex !== '' && categories[selectedCatIndex].subcategories.map((sub, index) => (
              <option key={index} value={index}>{sub.title}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Prompt / Tarea</label>
          <select value={selectedPromptIndex} onChange={handlePromptChange} disabled={selectedSubIndex === ''}>
            <option value="">-- Selecciona el Prompt --</option>
            {selectedSubIndex !== '' && categories[selectedCatIndex].subcategories[selectedSubIndex].prompts.map((p, index) => (
              <option key={index} value={index}>{p.title}</option>
            ))}
          </select>
        </div>

        {/* Preview */}
        <div className="form-group">
          <label>Plantilla del Prompt</label>
          <div className="preview-box">
            {renderHighlightedPreview(currentPromptTemplate)}
          </div>
        </div>

        {/* Inputs Dinámicos */}
        {Object.keys(dynamicInputs).length > 0 && (
          <div className="dynamic-inputs-area">
            <div className="tip-box" style={{background: 'rgba(251, 191, 36, 0.1)', padding: '10px', borderRadius: '5px', color: '#fbbf24', fontSize: '0.9em', marginBottom: '10px'}}>
              💡 <strong>Personaliza:</strong> Rellena los datos para adaptar el prompt.
            </div>
            {Object.keys(dynamicInputs).map((key) => (
              <div key={key} className="form-group">
                <label>{key.replace('[', '').replace(']', '')}</label>
                <input 
                  type="text" 
                  placeholder={`Ingresa: ${key}`}
                  value={dynamicInputs[key]}
                  onChange={(e) => handleInputChange(key, e.target.value)}
                />
              </div>
            ))}
          </div>
        )}

        {/* Botón Generar */}
        <button 
          className="btn-primary" 
          onClick={handleGenerate}
          disabled={!currentPromptTemplate}
        >
          ✨ Generar Prompt
        </button>

        {/* Resultado */}
        {generatedPrompt && (
          <div className="result-area">
            <div className="result-box">
              <div className="result-content">{generatedPrompt}</div>
            </div>
            
            <button className="btn-copy" onClick={handleCopy}>
              {copyStatus}
            </button>

            <div className="ai-buttons-grid">
              <button className="btn-ai" onClick={() => handleExecute('https://chat.openai.com/')}>
                🟢 ChatGPT
              </button>
              <button className="btn-ai" onClick={() => handleExecute('https://claude.ai/')}>
                🟠 Claude
              </button>
              <button className="btn-ai" onClick={() => handleExecute('https://gemini.google.com/')}>
                🔵 Gemini
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Footer */}
      <div className="footer-wrapper">
        <img src="https://contador4-0-master.vercel.app/personaje-contador.png" alt="Personaje" className="floating-character" />
        <footer className="app-footer">
          <div className="footer-links">
            <a href="https://jairoamaya.co" target="_blank">Sitio Web</a> •
            <a href="https://linkedin.com/in/jairoamaya" target="_blank">LinkedIn</a> •
            <a href="mailto:hola@jairoamaya.co">Contacto</a>
          </div>
          <div className="footer-branding">
            <p><strong>Contador 4.0 Suite</strong></p>
            <p>Herramienta de productividad diseñada por <a href="https://jairoamaya.co" style={{color:'#a8b3ff', textDecoration:'underline'}}>Jairo Amaya</a></p>
          </div>
          <p style={{opacity: 0.6, fontSize: '0.8rem', marginTop: '20px'}}>© 2025 Todos los derechos reservados.</p>
        </footer>
      </div>

    </div>
  );
}

export default App;
