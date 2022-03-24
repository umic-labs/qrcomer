import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import './config/i18n'

import MealsPage from "./pages/MealsPage";
import HomePage from './pages/HomePage'
import LecturesPage from './pages/LecturesPage'
import AttendeePage from './pages/AttendeePage'
import RegisterServicePage from './pages/RegisterServicePage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/meals' element={<MealsPage/>} />
        <Route path='/lectures' element={<LecturesPage/>} />
        <Route path='/attendee' element={<AttendeePage/>} />
        <Route path='/register-service' element={<RegisterServicePage/>} />
      </Routes>
    </Router>
  );
}

export default App;
