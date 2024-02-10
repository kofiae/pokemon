import './asset/App.css';
import Home from './pages/Home';
import Types from './pages/Types';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <>
          <Route path="/" element={<Home />} />
          <Route path="/types" element={<Types />} />
        </>
      </Routes>
    </Router>
  );
}

export default App;
