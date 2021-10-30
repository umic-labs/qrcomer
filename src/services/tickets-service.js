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
    const getTicketsFromStorage = localStorage.getItem('cart')
    const tickets = !getTicketsFromStorage
      ? initialTicketList
      : JSON.parse(getTicketsFromStorage)

    return tickets
  }

  return []
}
