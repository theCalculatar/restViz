import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { NotFound } from './pages/_404'
import { Box, Flex, Theme } from '@radix-ui/themes'
import Sidebar from './components/Sidebar'
import { AppContext } from './context'
import { useContext } from 'preact/hooks'
import { toogleNav } from './context/actions'
import { Header } from './components/Header'

export default function App() {
  const { toogleNav: toogleNavFn, isNavOpen } = useContext(AppContext)
  const { theme } = useContext(AppContext)
  return (
    <Theme appearance={theme} accentColor="blue" radius="small" scaling="95%">
      <Flex direction={'column'} height={'100vh'}>
        <Router>
          <Header />
          <Flex className={'flex-1'} overflow={'hidden'}>
            <Sidebar />
            {isNavOpen && (
              <div
                className="fixed inset-0 z-auto"
                onClick={() => {
                  toogleNavFn(toogleNav)
                }}
              ></div>
            )}
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
    </Theme>
  )
}
