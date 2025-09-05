import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Home } from './pages/Home'
import { About } from './pages/About'

export default function App() {
  return (
    <Router>
      <nav className="bg-gray-200">
        <Link to="/" className="text-blue-500">
          Home
        </Link>
        <Link to="/about" className="text-blue-500">
          About
        </Link>
      </nav>

      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  )
}
