import {
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Progress,
  Section,
  Text,
} from '@radix-ui/themes'
import { BookOpen, Zap, ExternalLink } from 'lucide-react'
import { useContext, useEffect, useState } from 'preact/hooks'
import { AppContext } from '../context'
import { Link, useNavigate } from 'react-router-dom'
import { methodColors } from '../utils/colors'
import { act_openNav } from '../context/actions'
import { Fragment } from 'preact/jsx-runtime'

function QuickActions() {
  const { config, history, routes, toogleNav } = useContext(AppContext)
  const navigate = useNavigate()
  const [recentRoutes, setRecentRoutes] = useState([])

  useEffect(() => {
    if (history.length === 0) {
      const popular = routes.slice(0, 2)
      setRecentRoutes(popular)
      return
    }

    const popular = history.slice(-2).reverse()
    setRecentRoutes(popular)
  }, [history])

  return (
    <Section py={'6'}>
      <Flex gap={'4'} direction={{ initial: 'column', sm: 'row' }}>
        <Card className={'w-full'}>
          <Box>
            <Flex gap={'4'} align={'center'}>
              <BookOpen /> <Text>Getting Started</Text>
            </Flex>
            <Text mt={'2'} size={'2'} color="gray">
              New to this API? Start here for authentication and basic concepts.
            </Text>
          </Box>
          <Box mt={'4'}>
            <Flex gap={'4'} align={'center'}>
              <Text size={'2'}>Base Url</Text>
              <Badge>{config.baseUrl}</Badge>
            </Flex>
          </Box>
          <Box mt={'4'}>
            <Flex direction={'column'} gap={'2'}>
              <Text size={'2'}>Authentication</Text>
              <Text size={'2'} color="gray">
                Include your API key in the Authorization header
              </Text>
            </Flex>
            <Button
              variant="outline"
              mt={'2'}
              radius="large"
              onClick={() => {
                navigate('/settings')
              }}
            >
              Confiqure Authentication
            </Button>
          </Box>
        </Card>

        <Card className={'w-full'}>
          <Box>
            <Flex gap={'4'} align={'center'}>
              <Zap /> <Text>Recent Endpoints</Text>
            </Flex>
            <Text mt={'2'} size={'2'} color="gray">
              Most recent used API endpoints
            </Text>
          </Box>
          {recentRoutes.length !== 0 ? (
            <Fragment>
              <Flex mt={'4'} gap={'2'} direction={'column'} align={'center'}>
                {recentRoutes.map((route) => (
                  <Link
                    to={`/test${route.path}`}
                    key={`${route.path}-${route.method}`}
                    className={'w-full'}
                  >
                    <Card variant="surface">
                      <Flex gap={'4'} align={'center'} justify={'between'}>
                        <Flex gap={'4'} align={'center'}>
                          <Badge
                            radius="large"
                            color={methodColors[route.method]}
                            size={'1'}
                          >
                            {route.method}
                          </Badge>
                          <Box>
                            <Flex direction={'column'}>
                              <Text
                                size={'2'}
                                className={'text-ellipsis line-clamp-1'}
                              >
                                {route.path}
                              </Text>
                              <Text
                                size={'1'}
                                color="gray"
                                className={'text-ellipsis line-clamp-1'}
                              >
                                {route.description}
                              </Text>
                            </Flex>
                          </Box>
                        </Flex>
                        <Box>
                          <ExternalLink />
                        </Box>
                      </Flex>
                    </Card>
                  </Link>
                ))}
              </Flex>
              <Flex justify={'center'}>
                <Button
                  variant="ghost"
                  mt={'4'}
                  onClick={() => {
                    toogleNav(act_openNav)
                  }}
                >
                  View All Endpoints
                </Button>
              </Flex>
            </Fragment>
          ) : (
            <Card variant="surface" mt={'4'}>
              <Flex direction={'column'} mb={'4'} gap={'2'}>
                <Text weight={'bold'}>Oops!</Text>
                <Text size={'2'} color="gray">
                  Your expressJs does not have routes or they are disabled!
                </Text>
              </Flex>
              <Link to={''} className={'mt-2'}>
                <Button size={'2'} variant="outline" radius="large">
                  Learn more!
                </Button>
              </Link>
            </Card>
          )}
        </Card>

        <Card className={'w-full'}>
          <Box className={'blur-sm'}>
            <Box>
              <Flex gap={'4'} align={'center'}>
                <BookOpen /> <Text>Rate Limits</Text>
              </Flex>
              <Text mt={'2'} color="gray" size={'2'}>
                Current API usage and limits
              </Text>
            </Box>
            <Box mt={'4'}>
              <Flex gap={'1'} direction={'column'}>
                <Flex justify={'between'} align={'center'}>
                  <Text size={'2'}>Requests This Month</Text>
                  <Text>1,234/10,000</Text>
                </Flex>
                <Progress
                  value={15}
                  color="green"
                  radius="full"
                  variant="soft"
                />
              </Flex>
              <Flex gap={'1'} mt={'2'} direction={'column'}>
                <Flex justify={'between'} align={'center'}>
                  <Text size={'2'}>Requests This Month</Text>
                  <Text>6,234/10,000</Text>
                </Flex>
                <Progress value={67} variant="soft" radius="full" />
              </Flex>
            </Box>
            <Flex justify={'center'}>
              <Button variant="ghost" mt={'4'}>
                View Analytics
              </Button>
            </Flex>
          </Box>
          <Box className={'absolute inset-0'}>
            <Flex
              height={'100%'}
              width={'100%'}
              align={'center'}
              justify={'center'}
              direction={'column'}
            >
              <Text>Analytics Feature</Text>
              <Text size={'2'} color="gray">
                (Coming Soon)
              </Text>
            </Flex>
          </Box>
        </Card>
      </Flex>
    </Section>
  )
}

export { QuickActions }
