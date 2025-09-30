import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  ScrollArea,
  Text,
} from '@radix-ui/themes'
import { useContext, useMemo } from 'preact/hooks'
import { Collapsible } from 'radix-ui'
import { AppContext } from '../context'
import { groupRoutesFn } from '../utils/routesUtils'
import { Link, useNavigate } from 'react-router-dom'
import { act_setCurrentRoute } from '../context/actions'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { methodColors } from '../utils/colors'

function Sidebar() {
  const {
    routes,
    isNavOpen,
    setCurrentRoute: setCurrentRouteFn,
    activeRoute,
  } = useContext(AppContext)
  let groupedRoute = useMemo(() => {
    return [...groupRoutesFn(routes).entries()]
  }, [routes])

  const isMobile = true
  const navigate = useNavigate()

  return (
    <aside
      className={
        'border-r h-full p-4 pt-[68px] lg:pt-4 w-64 sm:w-80 flex flex-col dark:border-white/10 border-black/10' +
        ' inset-y-0 left-0 z-50 fixed -translate-x-full lg:static lg:transform-none backdrop-blur-lg ' +
        ' transition-transform duration-200 ease-in-out bg-white/[0.02] ' +
        `${isMobile && isNavOpen && 'translate-x-0'}`
      }
    >
      <Heading size={'4'}>
        <Flex align={'center'} justify={'between'}>
          Api endpoints
          <Button
            color="gray"
            variant="outline"
            className={'rounded-mdd'}
            radius="large"
            size={'1'}
          >
            History
          </Button>
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
                            route.path === activeRoute.path &&
                            route.method === activeRoute.method &&
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
                            navigate(`test${route.path}`)
                          }}
                        >
                          <Flex align={'center'} gap={'1'}>
                            <Badge
                              color={methodColors[route.method]}
                              size={'1'}
                            >
                              {console.log(methodColors[route.method])}
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
