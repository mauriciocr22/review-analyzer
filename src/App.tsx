import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Analysis from './pages/Analysis';
import History from './pages/History';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
        <Route path="/analysis/:id" element={<Analysis />} />
      </Routes>
    </Router>
  );
}

export default App;
