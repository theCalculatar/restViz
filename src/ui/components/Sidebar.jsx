import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  ScrollArea,
  Text,
} from '@radix-ui/themes'
import { useContext, useEffect, useMemo } from 'preact/hooks'
import { Collapsible } from 'radix-ui'
import { AppContext } from '../context'
import { groupRoutesFn } from '../utils/routesUtils'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  act_closeNav,
  act_openNav,
  act_setCurrentRoute,
  act_toogleNav,
} from '../context/actions'
import { ChevronDown, ChevronUp, PanelLeft } from 'lucide-react'
import { methodColors } from '../utils/colors'
import { useIsMobile } from '../hooks/useMobile'

function Sidebar() {
  const {
    routes,
    isNavOpen,
    setCurrentRoute: setCurrentRouteFn,
    activeRoute,
    toogleNav,
  } = useContext(AppContext)
  let groupedRoute = useMemo(() => {
    return [...groupRoutesFn(routes).entries()]
  }, [routes])

  const isMobile = useIsMobile()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!location.pathname.includes('test')) {
      toogleNav(act_closeNav)
    }
  }, [location])

  return (
    <aside
      className={
        'border-r h-full p-4 pt-[68px] lg:pt-4 w-64 sm:w-80 flex flex-col dark:border-white/10 border-black/10' +
        ' inset-y-0 left-0 z-50 fixed -translate-x-full  backdrop-blur-lg ' +
        ' transition-transform duration-200 ease-in-out bg-white/[0.02] ' +
        `${isNavOpen && 'translate-x-0 lg:static'}`
      }
    >
      <Heading size={'4'}>
        <Flex align={'center'} justify={'between'}>
          Api endpoints
          {!isMobile && (
            <Flex
              className={`absolute -right-8 hidden  ' + ${
                !isNavOpen && ' lg:top-[68px]'
              }`}
            >
              <Button
                size={'2'}
                variant={'ghost'}
                color="gray"
                onClick={() => {
                  toogleNav(act_toogleNav)
                }}
              >
                <PanelLeft />
              </Button>
            </Flex>
          )}
        </Flex>
      </Heading>
      <ScrollArea type="scroll" scrollbars="vertical" size={'1'}>
        <Flex
          direction={'column'}
          gap={'1'}
          mt={'2'}
          flexGrow={'1'}
          className={'select-none'}
        >
          {groupedRoute.map((group, key) => {
            return (
              <Collapsible.Root key={key}>
                <Collapsible.Trigger asChild className={'collapse-trigger'}>
                  <Box
                    px={'2'}
                    py={'1'}
                    className={'dark:hover:bg-white/10 hover:bg-black/10 '}
                    style={{
                      borderRadius: 'var(--radius-3)',
                    }}
                  >
                    <Flex justify={'between'} align={'center'}>
                      <Text size={'2'} className="IconButton">
                        {group[0]}
                      </Text>
                      <Box>
                        <ChevronUp className={'ico-closed'} />
                        <ChevronDown className={'ico-open'} />
                      </Box>
                    </Flex>
                  </Box>
                </Collapsible.Trigger>
                <Collapsible.Content className={'CollapsibleContent'}>
                  <Flex direction={'column'} gap={'1'} px={'2'}>
                    {group[1].map((route, index) => {
                      return (
                        <Flex
                          key={index}
                          px={'2'}
                          py={'1'}
                          direction={'column'}
                          width={'100%'}
                          className={`w-full dark:hover:bg-white/10 hover:bg-black/5 ${
                            route.url === activeRoute.url &&
                            'bg-black/10 dark:bg-white/15'
                          }`}
                          style={{
                            borderRadius: 'var(--radius-3)',
                          }}
                          onClick={() => {
                            setCurrentRouteFn({
                              type: act_setCurrentRoute,
                              payload: route,
                            })
                            navigate(`test/${route.url}`)
                          }}
                        >
                          <Flex align={'center'} gap={'1'}>
                            <Badge
                              color={methodColors[route.method]}
                              size={'1'}
                            >
                              {route.method}
                            </Badge>
                            <Box p={'1'}>
                              <Text className="IconButton" size={'2'}>
                                {route.path}
                              </Text>
                            </Box>
                          </Flex>
                          <Text size={'1'} color="gray">
                            {route.description}
                          </Text>
                        </Flex>
                      )
                    })}
                  </Flex>
                </Collapsible.Content>
              </Collapsible.Root>
            )
          })}
        </Flex>
      </ScrollArea>
      <Flex
        direction={'column'}
        className={'w-full border-t dark:border-white/10 border-black/10 p-2'}
      >
        <Link to={'/settings'} className={'w-full'}>
          <Text size={'2'} className={'w-full'}>
            Settings
          </Text>
        </Link>
        <Link to={'/docs'}>
          <Text size={'2'}>Documentation</Text>
        </Link>
      </Flex>
    </aside>
  )
}

export default Sidebar
