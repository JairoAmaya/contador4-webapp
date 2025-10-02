import React, { useState } from 'react'
import './styles.css'

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app">
      <h1>🚀 Contador 4.0</h1>
      <p>Multiplica tus ingresos hasta 3x con 115+ prompts de IA listos para usar</p>
      <div className="counter">
        <button onClick={() => setCount(count - 1)}>-</button>
        <span>{count}</span>
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
    </div>
  )
}
