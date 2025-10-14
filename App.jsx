import React, { useState, useMemo } from 'react'
import './styles.css'
import promptsData from './data/prompts_data_complete.json'

export default function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFrequency, setSelectedFrequency] = useState('all')
  const [expandedPrompts, setExpandedPrompts] = useState({})
  const [copiedPrompts, setCopiedPrompts] = useState({})

  // Extraer frecuencias únicas
  const frequencies = useMemo(() => {
    const freqs = [...new Set(promptsData.map(p => p.frecuencia))]
    return ['all', ...freqs]
  }, [])

  // Filtrar prompts
  const filteredPrompts = useMemo(() => {
    return promptsData.filter(prompt => {
      const matchesSearch = prompt.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           prompt.contenido.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesFrequency = selectedFrequency === 'all' || prompt.frecuencia === selectedFrequency
      return matchesSearch && matchesFrequency
    })
  }, [searchTerm, selectedFrequency])

  const togglePrompt = (index) => {
    setExpandedPrompts(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  const copyPrompt = (content, index) => {
    navigator.clipboard.writeText(content)
    setCopiedPrompts(prev => ({ ...prev, [index]: true }))
    setTimeout(() => {
      setCopiedPrompts(prev => ({ ...prev, [index]: false }))
    }, 2000)
  }

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <div className="header-icon">📊</div>
        <div className="header-text">
          <h1>Contador 4.0</h1>
          <p>Sistema de Transformación con IA para Contadores</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <div className="section-header">
          <h2>Biblioteca de Prompts ({promptsData.length} prompts profesionales)</h2>
          
          {/* Search Bar */}
          <div className="search-bar">
            <input
              type="text"
              placeholder="🔍 Buscar prompts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          {/* Frequency Filter */}
          <div className="filter-section">
            <label className="filter-label">Filtrar por frecuencia:</label>
            <div className="frequency-filters">
              {frequencies.map(freq => (
                <button
                  key={freq}
                  className={`filter-btn ${selectedFrequency === freq ? 'active' : ''}`}
                  onClick={() => setSelectedFrequency(freq)}
                >
                  {freq === 'all' ? 'Todos' : freq}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="results-info">
          Mostrando {filteredPrompts.length} de {promptsData.length} prompts
        </div>

        {/* Prompts List */}
        <div className="prompts-container">
          {filteredPrompts.map((prompt, index) => (
            <div key={index} className="prompt-card">
              <div 
                className="prompt-card-header"
                onClick={() => togglePrompt(index)}
              >
                <div className="prompt-card-title">
                  <h3>{prompt.nombre}</h3>
                  <div className="prompt-metadata">
                    <span className="badge badge-frequency">{prompt.frecuencia}</span>
                    <span className="badge badge-when">📅 {prompt.cuando}</span>
                  </div>
                </div>
                <div className={`expand-icon ${expandedPrompts[index] ? 'expanded' : ''}`}>
                  ▼
                </div>
              </div>

              {expandedPrompts[index] && (
                <div className="prompt-card-content">
                  <div className="prompt-text">
                    {prompt.contenido}
                  </div>
                  <button
                    className={`copy-button ${copiedPrompts[index] ? 'copied' : ''}`}
                    onClick={() => copyPrompt(prompt.contenido, index)}
                  >
                    {copiedPrompts[index] ? '✓ Copiado' : '📋 Copiar prompt'}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredPrompts.length === 0 && (
          <div className="no-results">
            <p>No se encontraron prompts que coincidan con tu búsqueda.</p>
            <button 
              className="reset-btn"
              onClick={() => {
                setSearchTerm('')
                setSelectedFrequency('all')
              }}
            >
              Limpiar filtros
            </button>
          </div>
        )}

        {/* Tips Section */}
        <div className="tips-section">
          <h3>💡 Consejos para usar los prompts</h3>
          <ul>
            <li>Usa la información de <strong>"Cuándo usar"</strong> para saber el contexto ideal</li>
            <li>La <strong>frecuencia</strong> te indica qué tan seguido deberías aplicar el prompt</li>
            <li>Personaliza el contenido según las necesidades específicas de tu cliente</li>
            <li>Usa <a href="https://claude.ai" target="_blank" rel="noopener">claude.ai</a> para análisis más profundos</li>
            <li>Combina múltiples prompts para casos complejos</li>
          </ul>
        </div>
      </main>
    </div>
  )
}
