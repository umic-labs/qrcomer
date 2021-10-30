const initialTicketList = [
  {
    id: '2564A',
    name: 'Igor Aragão',
    church: 'PIC Taguatinga',
    meals: [1, 0, 0],
  },
]

export function getTickets() {
  if (typeof window !== 'undefined' && window) {
    const getTicketsFromStorage = localStorage.getItem('tickets')
    const tickets = !getTicketsFromStorage
      ? initialTicketList
      : JSON.parse(getTicketsFromStorage)

    return tickets
  }

  return []
}

export function createTicket(ticketsManager, newTicket) {
  const { tickets, setTickets } = ticketsManager
  let ticket = { ...newTicket, meals: [0, 0, 0] }
  tickets.push(ticket)

  localStorage.setItem('tickets', JSON.stringify(tickets))
  setTickets(tickets)
}
