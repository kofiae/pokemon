import './asset/App.css';
import Home from './pages/Home';
import Types from './pages/Types';
import Pokemon from './pages/Pokemon';

import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <>
          <Route path="/" element={<Home />} />
          <Route path="/types" element={<Types />} />
          <Route path="/pokemon" element={<Pokemon />} />
        </>
      </Routes>
    </Router>
  );
}

export default App;
