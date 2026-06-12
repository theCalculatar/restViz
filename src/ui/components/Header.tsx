import {
  Avatar,
  Box,
  Button,
  DropdownMenu,
  Flex,
  Heading,
} from '@radix-ui/themes'
import { MenuIcon } from 'lucide-react'
import { useIsMobile } from '../hooks/useMobile'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'preact/hooks'
import { AppContext } from '../context'
import { act_setConfigtTheme, act_toogleNav } from '../context/actions'

export function Header() {
  const isMobile = useIsMobile()
  const navigate = useNavigate()
  const { toogleNav: toogleNavFn, config, setConfig } = useContext(AppContext)

  return (
    <header>
      <Flex
        className={'border-b-[1px] dark:border-white/10 border-black/10'}
        px={'4'}
        py={'2'}
        justify={'between'}
      >
        <Flex gap={'4'} direction={'row'} align={'center'}>
          {isMobile && (
            <Button
              variant="outline"
              onClick={() => {
                toogleNavFn(act_toogleNav)
              }}
            >
              <MenuIcon />
            </Button>
          )}
          <Link to="/">
            <Heading
              as="h1"
              size={{
                initial: '3',
                sm: '5',
              }}
            >
              {config.name}
            </Heading>
          </Link>
        </Flex>
        <Box>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Avatar
                src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
                fallback="A"
                radius="full"
                style={{ cursor: 'pointer' }}
              />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content
              style={{ marginTop: '6px', marginRight: '6px' }}
            >
              <DropdownMenu.Item shortcut="⌘ S">Share</DropdownMenu.Item>
              <DropdownMenu.Item
                shortcut="⌘ M"
                onClick={() => {
                  navigate('/settings')
                }}
              >
                Settings
              </DropdownMenu.Item>
              <DropdownMenu.Item
                shortcut="⌘ D"
                onClick={() => {
                  setConfig({ type: act_setConfigtTheme })
                }}
              >
                <span className={'capitalize'}>
                  {config.theme === 'dark' ? 'light' : 'dark'} mode
                </span>
              </DropdownMenu.Item>
              <DropdownMenu.Separator />
              <DropdownMenu.Item
                shortcut="⌘ E"
                color="red"
                onClick={() => {
                  localStorage.clear()
                  sessionStorage.clear()
                  window.location.reload()
                }}
              >
                Clear cache
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </Box>
      </Flex>
    </header>
  )
}
