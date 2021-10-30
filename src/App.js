import React, { useEffect, useState } from "react";

import { getTickets } from "./services/tickets-service";

import CreateTicket from "./pages/create-ticket";
import ListTickets from "./pages/list-tickets";
import ReadTicket from "./pages/read-ticket";

function App() {
  const [currentPage, setCurrentPage] = useState("list");
  const [tickets, setTickets] = useState(null);

  const ticketsManager = {
    tickets: tickets,
    setTickets: setTickets
  };

  useEffect(() => {
    const tickets = getTickets();

    setTickets(tickets);
  }, [])

  return (
    <div className="container pt-4">
      <h1>UMIC Tickets</h1>
      <br/>
      <button className="btn btn-primary me-2" onClick={() => setCurrentPage("list")}>Lista</button>
      <button className="btn btn-primary me-2" onClick={() => setCurrentPage("create")}>Criar</button>
      <button className="btn btn-primary me-2" onClick={() => setCurrentPage("read")}>Ler QR Code</button>
      <br/>
      {
        currentPage === "list" ? <ListTickets ticketsManager={ticketsManager}/> :
        currentPage === "create" ? <CreateTicket ticketsManager={ticketsManager}/> :
        currentPage === "read" ? <ReadTicket ticketsManager={ticketsManager}/> :
        null
      }
    </div>
  );
}

export default App;
