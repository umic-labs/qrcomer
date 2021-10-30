import React, { useState } from 'react'
import QrReader from 'react-qr-reader'
import { updateMeal } from '../services/tickets-service'

function ReadTicket({ ticketsManager }) {
  const [currentMeal, setCurrentMeal] = useState(null)
  /*
  const handleError = (e, err) => {
    e.preventDefault()
    console.log(err)
    alert('Erro ao ler QR Code')

    setCurrentMeal(null)
  }

  const handleScan = (e, data) => {
    e.preventDefault()
    if (data) {
      let status = updateMeal(ticketsManager, 12345, currentMeal)
      status ? alert('Já comeu') : alert('Boa refeição')
    }
    setCurrentMeal(null)
  }
*/
  const handleScan = (data) => {
    if (!!data) {
      let status = updateMeal(ticketsManager, data, currentMeal)
      status ? alert('Já comeu') : alert('Boa refeição')

      console.log(data)
      setCurrentMeal(null)
    }
  }

  const handleError = (err) => {
    console.log(err)
    alert('Erro ao ler QR Code')

    setCurrentMeal(null)
  }

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
          <QrReader
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ width: '100%' }}
          />
        </>
      )}
    </div>
  )
}

export default ReadTicket
