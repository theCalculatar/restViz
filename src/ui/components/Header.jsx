import {
  Avatar,
  Box,
  Button,
  DropdownMenu,
  Flex,
  Heading,
} from '@radix-ui/themes'
import { ChartColumnIncreasingIcon, LogIn, MenuIcon } from 'lucide-react'
import { useIsMobile } from '../hooks/useMobile'
import { Link, useNavigate } from 'react-router-dom'

export function Header() {
  const loggedIn = true
  const isMobile = useIsMobile()
  const navigate = useNavigate()

  return (
    <header>
      <Flex
        className={'border-b-[1px] dark:border-white/10 border-black/10'}
        px={{ initial: '4', xs: '6' }}
        py={'4'}
        justify={'between'}
      >
        <Flex gap={'4'} direction={'row'} align={'center'}>
          {isMobile && (
            <Button variant="ghost" size={{}}>
              <MenuIcon />
            </Button>
          )}
          <Link to="/">
            <Heading
              as="h1"
              size={{
                initial: '3',
                sm: '5',
                md: '6',
                xl: '7',
              }}
            >
              My API Documantation
            </Heading>
          </Link>
          {!isMobile && loggedIn && (
            <Button>
              <ChartColumnIncreasingIcon /> Dashboard
            </Button>
          )}
        </Flex>
        <Box>
          {!loggedIn ? (
            <Button>
              <LogIn width={16} />
              Sign In
            </Button>
          ) : (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <DropdownMenu.Trigger>
                  <Avatar
                    src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
                    fallback="A"
                    radius="full"
                  />
                </DropdownMenu.Trigger>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content
                style={{ marginTop: '6px', marginRight: '6px' }}
              >
                <DropdownMenu.Item
                  shortcut="⌘ P"
                  onClick={() => {
                    window.location.replace('https://restviz.vercel.app')
                  }}
                >
                  Profile
                </DropdownMenu.Item>
                <DropdownMenu.Item shortcut="⌘ S">Share</DropdownMenu.Item>
                <DropdownMenu.Item
                  shortcut="⌘ D"
                  onClick={() => {
                    navigate('/settings')
                  }}
                >
                  Settings
                </DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item
                  shortcut="⌘ E"
                  color="red"
                  onClick={() => console.log('Signed out!')}
                >
                  Sign Out
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          )}
        </Box>
      </Flex>
    </header>
  )
}
