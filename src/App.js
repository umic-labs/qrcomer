import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import './config/i18n'

import MealsPage from "./pages/MealsPage";
import HomePage from './pages/HomePage'
import SessionsPage from './pages/SessionsPage'
import AttendeePage from './pages/AttendeePage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/meals' element={<MealsPage/>} />
        <Route path='/sessions' element={<SessionsPage/>} />
        <Route path='/attendee' element={<AttendeePage/>} />
      </Routes>
    </Router>
  );
}

export default App;
