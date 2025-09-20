import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { NotFound } from './pages/_404'
import { Header } from './components/Header'

export default function App() {
  return (
    <Router>
      <Header />

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
