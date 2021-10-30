function ListTickets({ ticketsManager }) {
  const { tickets } = ticketsManager

  console.log(tickets)

  const getTicketMealStatus = (meals) =>
    meals.map((meal) => {
      return meal ? `✔️` : `❌`
    })

  const listTickets = () =>
    tickets.map((ticket) => {
      return (
        <tr key={ticket.id}>
          <th scope="row">{ticket.id}</th>
          <td>{ticket.name}</td>
          <td>{getTicketMealStatus(ticket.meals)}</td>
        </tr>
      )
    })

  return !tickets ? (
    <div className="container pt-4">
      <h4>Carregando...</h4>
    </div>
  ) : !tickets.length ? (
    <div className="container pt-4">
      <h4>Lista Vazia</h4>
    </div>
  ) : (
    <div className="container pt-4">
      <h4>Lista de Tickets</h4>
      <br />
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nome</th>
              <th scope="col">Refeição</th>
            </tr>
          </thead>
          <tbody>
            {listTickets()}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ListTickets
