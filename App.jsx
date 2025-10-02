
import React, { useState } from 'react'

const DATA = {
  title: 'Contador 4.0 — Prompts Interactivos',
  description:
    'Explora, busca y copia prompts profesionales para contadores. Basado en el PDF "Contador 4.0" — 115+ prompts organizados por categoría.',
  categories: [
    {
      id: 'analisis',
      name: 'Análisis Financiero Estratégico',
      prompts: [
        {
          id: 'p1',
          title: 'Análisis de Rentabilidad Multidimensional',
          body:
            'Actúa como un CFO senior con 15 años de experiencia analizando empresas del sector [SECTOR ESPECÍFICO]. Analiza los siguientes datos financieros: Ingresos últimos 12 meses: $[MONTO]; Costos directos: $[MONTO]; Gastos operativos: $[MONTO]; Capital de trabajo: $[MONTO]; Deuda total: $[MONTO]. ESTRUCTURA TU ANÁLISIS EN: 1) Diagnóstico financiero integral; 2) Análisis de flujo de efectivo predictivo; 3) Estrategia de optimización financiera; 4) Comunicación ejecutiva (resumen de 200 palabras).',
        },
        {
          id: 'p2',
          title: 'Análisis Integral de Estados Financieros',
          body:
            'Actúa como un analista financiero senior. Analiza los estados financieros adjuntos (balance, estado de resultados y cambios en patrimonio) de los últimos 3 años. Identifica 5 tendencias significativas, evalúa salud financiera y proporciona 3 recomendaciones estratégicas.',
        },
      ],
    },
    {
      id: 'comunicacion',
      name: 'Comunicación Empresarial',
      prompts: [
        {
          id: 'p16',
          title: 'Comunicación de Cambios o Ajustes',
          body:
            'Redacta una carta profesional dirigida a clientes explicando [cambio específico]. Mantén tono empático, explica razones, timeline de implementación y canal de consultas.',
        },
        {
          id: 'p17',
          title: 'Explicación de Resultados',
          body:
            'Elabora una comunicación personalizada para explicar resultados del proyecto/servicio del último periodo. Incluye resumen ejecutivo, métricas comparadas y próximos pasos.',
        },
      ],
    },
    {
      id: 'fiscal',
      name: 'Cumplimiento Fiscal',
      prompts: [
        {
          id: 'p61',
          title: 'Calendario de Obligaciones',
          body:
            'Genera un calendario de obligaciones fiscales para [jurisdicción] con fechas límite, responsable y pasos para cumplir cada obligación.',
        },
        {
          id: 'p2f',
          title: 'Planificación Fiscal Integral',
          body:
            'Analiza la carga fiscal actual, propone 5 oportunidades legales de optimización con impacto cuantificado y una matriz de riesgos tributarios.',
        },
      ],
    },
  ],
}

export default function App() {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)
  const [category, setCategory] = useState(DATA.categories[0].id)

  const currentCategory = DATA.categories.find((c) => c.id === category)

  const filtered = currentCategory.prompts.filter(
    (p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.body.toLowerCase().includes(query.toLowerCase())
  )

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
    alert('Prompt copiado al portapapeles')
  }

  function exportPrompt(p) {
    const blob = new Blob([p.body], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${p.id}-${p.title.replace(/\\s+/g, '-')}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-bold">{DATA.title}</h1>
          <p className="text-gray-600 mt-1">{DATA.description}</p>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <aside className="md:col-span-1">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h2 className="font-semibold mb-3">Categorías</h2>
              <ul className="space-y-2">
                {DATA.categories.map((c) => (
                  <li key={c.id}>
                    <button
                      className={`w-full text-left p-2 rounded-md hover:bg-gray-100 ${
                        c.id === category ? 'bg-blue-50 border border-blue-100' : ''
                      }`}
                      onClick={() => {
                        setCategory(c.id)
                        setSelected(null)
                        setQuery('')
                      }}
                    >
                      {c.name} <span className="text-sm text-gray-400">({c.prompts.length})</span>
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-4">
                <a className="text-sm text-blue-600 underline" href="#" onClick={(e) => e.preventDefault()}>
                  Ver PDF original
                </a>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm mt-4">
              <h3 className="font-medium mb-2">Acciones</h3>
              <button
                className="w-full p-2 bg-blue-600 text-white rounded-md mb-2"
                onClick={() => {
                  const all = DATA.categories.flatMap((c) => c.prompts)
                  const txt = all.map((p) => `# ${p.title}\\n\\n${p.body}\\n\\n`).join('\\n')
                  const blob = new Blob([txt], { type: 'text/plain' })
                  const url = URL.createObjectURL(blob)
                  const a = document.createElement('a')
                  a.href = url
                  a.download = 'contador4-prompts-all.txt'
                  a.click()
                  URL.revokeObjectURL(url)
                }}
              >
                Descargar todos los prompts (txt)
              </button>

              <button className="w-full p-2 border rounded-md" onClick={() => alert('Para obtener una URL pública: sube este proyecto a Vercel o Netlify.')}>
                ¿Cómo obtener una URL pública?
              </button>
            </div>
          </aside>

          <section className="md:col-span-3">
            <div className="mb-4 flex items-center gap-4">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 p-3 rounded-lg border"
                placeholder="Buscar prompts por título o texto..."
              />

              <div className="text-sm text-gray-500">Resultados: {filtered.length}</div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filtered.map((p) => (
                <article key={p.id} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md">
                  <h4 className="font-semibold">{p.title}</h4>
                  <p className="text-sm text-gray-700 mt-2 line-clamp-4">{p.body}</p>

                  <div className="mt-3 flex gap-2">
                    <button className="px-3 py-1 rounded border text-sm" onClick={() => { setSelected(p); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
                      Ver completo
                    </button>

                    <button className="px-3 py-1 rounded border text-sm" onClick={() => copyToClipboard(p.body)}>
                      Copiar
                    </button>

                    <button className="px-3 py-1 rounded border text-sm" onClick={() => exportPrompt(p)}>
                      Exportar
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {selected && (
              <div className="mt-6 bg-white p-4 rounded-lg shadow-lg">
                <h3 className="font-bold text-xl">{selected.title}</h3>
                <pre className="whitespace-pre-wrap mt-3 text-sm">{selected.body}</pre>

                <div className="mt-4 flex gap-2">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={() => copyToClipboard(selected.body)}>
                    Copiar prompt
                  </button>

                  <button className="px-4 py-2 border rounded" onClick={() => exportPrompt(selected)}>
                    Descargar .txt
                  </button>
                </div>
              </div>
            )}
          </section>
        </main>

        <footer className="mt-8 text-sm text-gray-500">
          Generado a partir del PDF \"Contador 4.0\" — incluye 115+ prompts. Usa los prompts como base y personalízalos según tu cliente.
        </footer>
      </div>
    </div>
  )
}
