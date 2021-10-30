import React, { useState } from "react";
import CreateTicket from "./pages/create-ticket";
import ListTickets from "./pages/list-tickets";
import ReadTicket from "./pages/read-ticket";

function App() {
  const [currentPage, setCurrentPage] = useState("list");

  return (
    <div className="container pt-4">
      <h1>UMIC Tickets</h1>
      <br/>
      <button className="btn btn-primary me-2" onClick={() => setCurrentPage("list")}>Lista</button>
      <button className="btn btn-primary me-2" onClick={() => setCurrentPage("create")}>Criar</button>
      <button className="btn btn-primary me-2" onClick={() => setCurrentPage("read")}>Ler QR Code</button>
      <br/>
      {
        currentPage === "list" ? <ListTickets/> :
        currentPage === "create" ? <CreateTicket/> :
        currentPage === "read" ? <ReadTicket/> :
        null
      }
    </div>
  );
}

export default App;
