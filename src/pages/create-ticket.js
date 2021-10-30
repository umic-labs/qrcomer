import React, { useState } from 'react'

import { createTicket } from '../services/tickets-service'

const initialTicketForm = {
  id: '',
  name: '',
  church: '',
}

function CreateTicket({ ticketsManager }) {
  const [ticketForm, setTicketForm] = useState(initialTicketForm)

  const handleSubmit = (e) => {
    e.preventDefault()
    createTicket(ticketsManager, ticketForm)
    alert('Ticket criado com sucesso')

    setTicketForm(initialTicketForm)
  }

  return (
    <div className="container pt-4">
      <h4>Criar Ticket</h4>
      <br />
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="form-group col-12 mb-2">
            <small>ID</small>
            <input
              className={`form-control`}
              type="text"
              value={ticketForm.id}
              placeholder="ID"
              onChange={(event) =>
                setTicketForm({ ...ticketForm, id: event.target.value })
              }
            />
          </div>
          <div className="form-group col-12 mb-2">
            <small>Nome</small>
            <input
              className={`form-control`}
              type="text"
              value={ticketForm.name}
              placeholder="Nome"
              onChange={(event) =>
                setTicketForm({ ...ticketForm, name: event.target.value })
              }
            />
          </div>
          <div className="form-group col-12 mb-2">
            <small>Igreja</small>
            <input
              className={`form-control`}
              type="text"
              value={ticketForm.church}
              placeholder="Igreja"
              onChange={(event) =>
                setTicketForm({ ...ticketForm, church: event.target.value })
              }
            />
          </div>
          <div className="form-group mt-2 mb-3 container">
            <button className="btn btn-primary w-100" type="submit">
              Criar Ticket
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default CreateTicket
