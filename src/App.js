import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import './config/i18n'

import HomePage from './pages/HomePage'
import AppointmentsPage from './pages/AppointmentsPage'
import AttendeePage from './pages/AttendeePage'
import RedeemPage from './pages/RedeemPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/lectures' element={<AppointmentsPage type="lecture" />} />
        <Route path='/meals' element={<AppointmentsPage type="meal" />} />
        <Route path='/workshops' element={<AppointmentsPage type="workshop" />} />
        <Route path='/attendee' element={<AttendeePage/>} />
        <Route path='/redeem/:appointment' element={<RedeemPage />} />
      </Routes>
    </Router>
  );
}

export default App;
