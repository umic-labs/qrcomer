import { initialTicketList } from '../constants/ticket-list'

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
  let ticket = { ...newTicket, meals: [0, 0, 0, 0, 0] }
  tickets.push(ticket)

  localStorage.setItem('tickets', JSON.stringify(tickets))
  setTickets(tickets)
}

export function updateMeal(ticketsManager, ticketID, currentMeal) {
  const { tickets, setTickets } = ticketsManager

  let ticketIndex = tickets.findIndex((ticket => ticket.id === ticketID))

  if (tickets[ticketIndex].meals[currentMeal] === 1 || ticketIndex < 0) return false 
  else tickets[ticketIndex].meals[currentMeal] = 1

  localStorage.setItem('tickets', JSON.stringify(tickets))
  setTickets(tickets)
  return true
}