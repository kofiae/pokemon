import './asset/App.css';
import Home from './pages/Home';
import Types from './pages/Types';
import Explication from './pages/Explication'
import Pokemon from './pages/Pokemon';
import Pokemon2 from './pages/Pokemon2';
import Pokemon3 from './pages/Pokemon3';

import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <>
          <Route path="/" element={<Home />} />
          <Route path="/types" element={<Types />} />
          <Route path="/stats" element={<Explication />} />
          <Route path="/pokemon" element={<Pokemon />} />
          <Route path="/pokemon/2" element={<Pokemon2 />} />
          <Route path="/pokemon/3" element={<Pokemon3 />} />
        </>
      </Routes>
    </Router>
  );
}

export default App;
