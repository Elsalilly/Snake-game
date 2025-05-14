import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartPage from './pages/StartPage';
import Login from './pages/login';
import Registration from './pages/registration';
import Game from './pages/game';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </Router>
  );
}

export default App;