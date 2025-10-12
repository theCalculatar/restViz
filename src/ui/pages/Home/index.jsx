import {
  Badge,
  Box,
  Button,
  Card,
  Container,
  Flex,
  Heading,
  Section,
  Text,
  TextField,
} from '@radix-ui/themes'
import { useContext, useEffect, useMemo, useState } from 'preact/hooks'
import { AppContext } from '../../context'
import {
  Activity,
  CheckCircle,
  Code,
  ExternalLink,
  Globe,
  Group,
  Users,
  X,
} from 'lucide-react'
import { QuickActions } from '../../components/QuickActions'
import { groupRoutesFn } from '../../utils/routesUtils'
import { Link } from 'react-router-dom'
import { Command } from '../../utils/command'

export function Home() {
  const { config, routes, history } = useContext(AppContext)
  const [isOperational, setisOperational] = useState('Down')
  const totalEndpoins = useMemo(() => routes.length, [])
  const endpointGroups = useMemo(() => groupRoutesFn(routes).size, [])
  const requestsToday = useMemo(() => {
    return history.filter((req) => {
      const today = new Date()
      const reqDate = new Date(req.timestamp)
      return (
        reqDate.getDate() === today.getDate() &&
        reqDate.getMonth() === today.getMonth() &&
        reqDate.getFullYear() === today.getFullYear()
      )
    }).length
  }, [history])

  useEffect(() => {
    // Simulate fetching API status from base endpoint
    const fetchApiStatus = async () => {
      try {
        const response = await fetch(config.base)
        const data = response.status
        if (data === 200) setisOperational('Operational')
      } catch (error) {
        setisOperational('Down')
      }
    }

    fetchApiStatus()
  })

  return (
    <Section
      p={'3'}
      height={'100%'}
      width={'100%'}
      overflow={'auto'}
      className={'w-full'}
    >
      <Container size={{ md: '3', xl: '4', sm: '3', initial: '1' }}>
        <Box className={'max-w-lg text-center mx-auto'}>
          <Heading size="6" align={'center'} mb={'2'}>
            {config.name}
          </Heading>
          <Text color="gray">
            Comprehensive API documentation with interactive testing
            capabilities. Explore endpoints, test requests, and monitor your API
            usage.
          </Text>
        </Box>

        <Flex gap={'2'} mt={'6'} justify={'center'} align={'center'}>
          <Command />
        </Flex>

        {/* API STATUS & METRICS */}
        <Flex
          direction={{ initial: 'column', sm: 'row' }}
          gap={'4'}
          align={'start'}
          mt={'8'}
        >
          <Card className={'w-full'}>
            <Flex gap={'4'} align={'center'} justify={'between'}>
              <Flex direction={'column'}>
                <Text size={'2'}>API status</Text>
                <Text weight={'bold'} className={'flex items-center gap-1'}>
                  {isOperational !== 'Down' ? (
                    <CheckCircle className={'text-green-500'} />
                  ) : (
                    <X className={'text-red-500'} />
                  )}
                  {isOperational}
                </Text>
              </Flex>
              <Activity className={'text-green-500'} />
            </Flex>
          </Card>
          <Card className={'w-full'}>
            <Flex gap={'4'} align={'center'} justify={'between'}>
              <Flex direction={'column'}>
                <Text size={'2'}>Total Endpoints</Text>
                <Text
                  weight={'bold'}
                  size={'4'}
                  className={'flex items-center gap-1'}
                >
                  {totalEndpoins}
                </Text>
              </Flex>
              <Globe className={'text-blue-500'} />
            </Flex>
          </Card>
          <Card className={'w-full'}>
            <Flex gap={'4'} align={'center'} justify={'between'}>
              <Flex direction={'column'}>
                <Text size={'2'}>Endpoint Groups</Text>
                <Text
                  weight={'bold'}
                  size={'4'}
                  className={'flex items-center gap-1'}
                >
                  {endpointGroups}
                </Text>
              </Flex>
              <Group className={'text-purple-500'} />
            </Flex>
          </Card>
          <Card className={'w-full'}>
            <Flex gap={'4'} align={'center'} justify={'between'}>
              <Flex direction={'column'}>
                <Text size={'2'}>Request today</Text>
                <Text
                  weight={'bold'}
                  size={'4'}
                  className={'flex items-center gap-1'}
                >
                  {requestsToday}
                </Text>
              </Flex>
              <Activity className={'text-orange-500'} />
            </Flex>
          </Card>
        </Flex>

        {/* QUICK ACTION */}
        <QuickActions />

        {/* Links */}
        <Card>
          <Flex direction={'column'}>
            <Text>Quick Links</Text>
            <Text size={'2'} color="gray">
              Helpful resources and external links
            </Text>
          </Flex>
          <Flex gap={'2'} direction={{ initial: 'column', sm: 'row' }} mt={'4'}>
            <Link
              className={'w-full'}
              to={'https://restviz.vercel.app/docs'}
              target="_blank"
            >
              <Card size={'1'} variant="surface">
                <Flex gap={'2'} align={'center'}>
                  <Code />
                  <Flex direction={'column'}>
                    <Text size={'2'}>SDK Documentation</Text>
                    <Text size={'1'} color="gray">
                      Client libraries and examples
                    </Text>
                  </Flex>
                </Flex>
              </Card>
            </Link>

            <Link
              to={'https://github.com/theCalculatar/restViz/issues'}
              target="_blank"
              className={'w-full'}
            >
              <Card size={'1'} variant="surface">
                <Flex gap={'2'} align={'center'}>
                  <ExternalLink />
                  <Flex direction={'column'}>
                    <Text size={'2'}>Contribute</Text>
                    <Text size={'1'} color="gray">
                      Improve the docs or report issues
                    </Text>
                  </Flex>
                </Flex>
              </Card>
            </Link>

            <Link
              to="https://github.com/theCalculatar/restViz/issues"
              target="_blank"
              className={'w-full'}
            >
              <Card size={'1'} variant="surface">
                <Flex gap={'2'} align={'center'}>
                  <Users />
                  <Flex direction={'column'}>
                    <Text size={'2'}>Developer support</Text>
                    <Text size={'1'} color="gray">
                      Get help from the community
                    </Text>
                  </Flex>
                </Flex>
              </Card>
            </Link>
          </Flex>
        </Card>
      </Container>
    </Section>
  )
}
