import React, { useState } from 'react'
import { updateMeal } from '../services/tickets-service'

function ReadTicket() {
  const [currentMeal, setCurrentMeal] = useState(null)

  return (
    <div className="container pt-4">
      <h4>Ler QR Code</h4>
      <br />
      {!currentMeal ? (
        <>
          <h5>Escolha qual refeição</h5>
          <button
            className="btn btn-primary me-2 mb-2"
            onClick={() => setCurrentMeal(0)}
          >
            Café Sábado
          </button>
          <button
            className="btn btn-primary me-2 mb-2"
            onClick={() => setCurrentMeal(1)}
          >
            Almoço Sábado
          </button>
          <button
            className="btn btn-primary me-2 mb-2"
            onClick={() => setCurrentMeal(2)}
          >
            Janta Sábado
          </button>
          <button
            className="btn btn-primary me-2 mb-2"
            onClick={() => setCurrentMeal(3)}
          >
            Café Domingo
          </button>
          <button
            className="btn btn-primary me-2 mb-2"
            onClick={() => setCurrentMeal(4)}
          >
            Almoço Domingo
          </button>
        </>
      ) : (
        <>
          <button className="btn" onClick={() => setCurrentMeal(null)}>
            Voltar
          </button>
          <br />
        </>
      )}
    </div>
  )
}

export default ReadTicket

/* 
AÇÕES 

Registrar refeição
Avisar se já tiver comido

*/
