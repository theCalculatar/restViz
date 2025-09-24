import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { NotFound } from './pages/_404'
import { Box, Flex } from '@radix-ui/themes'
import Sidebar from './components/Sidebar'


export default function App() {
  return (
    <Flex direction={'column'} height={'100vh'}>
      <Router>
        <nav className="bg-gray-200 py-2 flex gap-4">
          <Link to="/" className="text-red-500">
            Home
          </Link>
          <Link to="/about" className="text-blue-500">
            About
          </Link>
        </nav>
        <Flex className={'flex-1'} overflow={'hidden'}>
          <Sidebar />
          <Box>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Box>
        </Flex>
      </Router>
    </Flex>
  )
}
