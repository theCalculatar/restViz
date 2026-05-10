import {
  HashRouter as Router,
  Routes,
  Route,
  useNavigate,
  useNavigation,
  useLocation,
} from 'react-router-dom'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { NotFound } from './pages/_404'
import { Box, Flex, Theme } from '@radix-ui/themes'
import Sidebar from './components/Sidebar'
import { AppContext } from './context'
import { useContext } from 'preact/hooks'
import { act_toogleNav } from './context/actions'
import { Header } from './components/Header'
import Settings from './pages/settings'
import { useIsMobile } from './hooks/useMobile'
import Suit from './pages/Suit'
import Dialog from './components/Dialog'
import { TestRunner } from './pages/test-runner'

export default function App() {
  const { toogleNav: toogleNavFn, isNavOpen, config } = useContext(AppContext)
  const isMobile = useIsMobile()

  return (
    <Theme
      appearance={config.theme}
      accentColor={config.accentColor || 'blue'}
      radius="small"
      scaling="95%"
    >
      <Flex direction={'column'} height={'100vh'}>
        <Router>
          <Header />
          <Flex className={'flex-1'} overflow={'hidden'}>
            <Sidebar />
            {isNavOpen && isMobile && (
              <div
                className="fixed inset-0 z-10"
                onClick={() => {
                  toogleNavFn(act_toogleNav)
                }}
              ></div>
            )}
            <Box flexGrow={'1'} overflow={'hidden'}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/suits" element={<Suit />} />
                <Route path="/suits/:suitId/" element={<TestRunner />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Box>
          </Flex>
          <Dialog />
        </Router>
      </Flex>
    </Theme>
  )
}
