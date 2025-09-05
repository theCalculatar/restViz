import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { NotFound } from './pages/_404'

export default function App() {
  return (
    <Router>
      <nav className="bg-gray-200 py-2 flex gap-4">
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  )
}
