import {
  Badge,
  Box,
  Button,
  Card,
  Container,
  Flex,
  Heading,
  Progress,
  Section,
  Text,
  TextField,
} from '@radix-ui/themes'
import { useContext } from 'preact/hooks'
import { AppContext } from '../../context'
import {
  Activity,
  BookOpen,
  CheckCircle,
  Code,
  ExternalLink,
  Globe,
  Group,
  Search,
  Users,
  Zap,
} from 'lucide-react'

export function Home() {
  const { config } = useContext(AppContext)

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
          <TextField.Root radius="large" placeholder="Search the docs...">
            <TextField.Slot>
              <Search />
            </TextField.Slot>
          </TextField.Root>
          <Button radius="large">Search</Button>
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
                  <CheckCircle className={'text-green-500'} /> operational
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
                  10
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
                  3
                </Text>
              </Flex>
              <Group className={'text-purple-500'} />
            </Flex>
          </Card>
          <Card className={'w-full'}>
            <Flex gap={'4'} align={'center'} justify={'between'}>
              <Flex direction={'column'}>
                <Text size={'2'}>API status</Text>
                <Text
                  weight={'bold'}
                  size={'4'}
                  className={'flex items-center gap-1'}
                >
                  1
                </Text>
              </Flex>
              <Activity className={'text-orange-500'} />
            </Flex>
          </Card>
        </Flex>

        {/* QUICK ACTION */}
        <Flex gap={'4'} mt={'6'} direction={{ initial: 'column', sm: 'row' }}>
          <Card className={'w-full'}>
            <Box>
              <Flex gap={'4'} align={'center'}>
                <BookOpen /> <Text>Getting Started</Text>
              </Flex>
              <Text mt={'2'} size={'2'} color="gray">
                New to this API? Start here for authentication and basic
                concepts.
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
              <Button variant="outline" mt={'2'} radius="large">
                Confiqure Authentication
              </Button>
            </Box>
          </Card>

          <Card className={'w-full'}>
            <Box>
              <Flex gap={'4'} align={'center'}>
                <Zap /> <Text>Popular Endpoints</Text>
              </Flex>
              <Text mt={'2'} size={'2'} color="gray">
                Most commonly used API endpoints
              </Text>
            </Box>
            <Flex mt={'4'} gap={'2'} direction={'column'} align={'center'}>
              <Card size={'1'} variant="surface" className={'w-full'}>
                <Flex gap={'4'} align={'center'} justify={'between'}>
                  <Flex gap={'4'} align={'center'}>
                    <Badge radius="large">GET</Badge>
                    <Box>
                      <Flex direction={'column'}>
                        <Text size={'2'}>Base Url</Text>
                        <Text size={'1'} color="gray">
                          Retrieve a list of users
                        </Text>
                      </Flex>
                    </Box>
                  </Flex>
                  <ExternalLink />
                </Flex>
              </Card>
              <Card size={'1'} variant="surface" className={'w-full'}>
                <Flex gap={'4'} align={'center'} justify={'between'}>
                  <Flex gap={'4'} align={'center'}>
                    <Badge radius="large">GET</Badge>
                    <Box>
                      <Flex direction={'column'}>
                        <Text size={'2'}>Base Url</Text>
                        <Text size={'1'} color="gray">
                          Retrieve a list of users
                        </Text>
                      </Flex>
                    </Box>
                  </Flex>
                  <ExternalLink />
                </Flex>
              </Card>
            </Flex>
            <Flex justify={'center'}>
              <Button variant="ghost" mt={'4'}>
                View All Endpoints
              </Button>
            </Flex>
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
                    <Text>1,234/10,000</Text>
                  </Flex>
                  <Progress value={15} variant="soft" radius="full" />
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

        {/* Links */}
        <Card mt={'6'}>
          <Flex direction={'column'}>
            <Text>Quick Links</Text>
            <Text size={'2'} color="gray">
              Helpful resources and external links
            </Text>
          </Flex>
          <Flex gap={'2'} direction={{ initial: 'column', md: 'row' }} mt={'4'}>
            <Card className={'w-full'} size={'1'} variant="surface">
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
            <Card className={'w-full'} size={'1'} variant="surface">
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
            <Card className={'w-full'} size={'1'} variant="surface">
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
          </Flex>
        </Card>
      </Container>
    </Section>
  )
}
