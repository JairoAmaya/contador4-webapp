import React, { useState } from 'react'
import './styles.css'
import promptsData from './data/prompts.json'

export default function App() {
  const [activeCategory, setActiveCategory] = useState(null)
  const [expandedPrompts, setExpandedPrompts] = useState({})
  const [copiedPrompts, setCopiedPrompts] = useState({})

  const toggleCategory = (categoryId) => {
    setActiveCategory(activeCategory === categoryId ? null : categoryId)
  }

  const togglePrompt = (promptId) => {
    setExpandedPrompts(prev => ({
      ...prev,
      [promptId]: !prev[promptId]
    }))
  }

  const copyPrompt = (content, promptId) => {
    navigator.clipboard.writeText(content)
    setCopiedPrompts(prev => ({ ...prev, [promptId]: true }))
    setTimeout(() => {
      setCopiedPrompts(prev => ({ ...prev, [promptId]: false }))
    }, 2000)
  }

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-icon">📊</div>
        <div className="header-text">
          <h1>Contador 4.0</h1>
          <p>Sistema de Transformación con IA para Contadores</p>
        </div>
      </header>

      <main className="main-content">
        <div className="section-title">
          <h2>Biblioteca de Prompts ({promptsData.reduce((acc, cat) => acc + cat.prompts.length, 0)} prompts)</h2>
        </div>

        <div className="categories-container">
          {promptsData.map(category => (
            <div key={category.id} className="category-card">
              <div 
                className="category-header"
                onClick={() => toggleCategory(category.id)}
              >
                <div className="category-left">
                  <div className={`category-badge ${category.color}`}>📊</div>
                  <div className="category-info">
                    <h3>{category.title}</h3>
                    <p>{category.prompts.length} prompts disponibles</p>
                  </div>
                </div>
                <div className={`category-toggle ${activeCategory === category.id ? 'active' : ''}`}>
                  ▶
                </div>
              </div>

              {activeCategory === category.id && (
                <div className="category-content">
                  {category.prompts.map(prompt => (
                    <div key={prompt.id} className="prompt-item">
                      <div 
                        className="prompt-header"
                        onClick={() => togglePrompt(prompt.id)}
                      >
                        {prompt.title}
                      </div>
                      
                      {expandedPrompts[prompt.id] && (
                        <div className="prompt-content">
                          <div className="prompt-text">
                            {prompt.content}
                          </div>
                          <button 
                            className={`copy-button ${copiedPrompts[prompt.id] ? 'copied' : ''}`}
                            onClick={() => copyPrompt(prompt.content, prompt.id)}
                          >
                            {copiedPrompts[prompt.id] ? '✓ Copiado' : '📋 Copiar'}
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="tips-section">
          <h3>💡 Consejos para usar los prompts</h3>
          <ul>
            <li>Cambia la información entre <strong>[corchetes]</strong> por datos específicos</li>
            <li>Usa <a href="https://claude.ai" target="_blank" rel="noopener">claude.ai</a> para análisis complejos</li>
            <li>Combina múltiples prompts según tus necesidades</li>
            <li>Revisa siempre los resultados antes de presentarlos</li>
          </ul>
        </div>
      </main>
    </div>
  )
}
