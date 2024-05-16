import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Appbar from './components/Appbar.jsx';
import Home from './pages/Home.jsx';

export default function App() {
  return (
    <div>
      <Router>
        <Appbar />
        <Routes>
          <Route path={"/"} element={<Home />} />
        </Routes>
      </Router>
    </div>
  )
}
