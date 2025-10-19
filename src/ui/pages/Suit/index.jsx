import {
  Badge,
  Box,
  Button,
  Card,
  Container,
  DropdownMenu,
  Flex,
  Heading,
  IconButton,
  Link,
  Section,
  Text,
} from '@radix-ui/themes'
import {
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Edit,
  EllipsisVertical,
  File,
  Folder,
  FolderIcon,
  Play,
  PlayCircleIcon,
  Plus,
  PlusSquare,
  Trash2,
} from 'lucide-react'
import { useContext } from 'preact/hooks'
import { AppContext } from '../../context'
import { act_setDialog } from '../../context/actions'
import CreateSuite from '../../components/CreateSuite'
import CreateTests from '../../components/CreateTests'
import { useIsMobile } from '../../hooks/useMobile'
import { Collapsible } from 'radix-ui'

function index() {
  const { config, setDialog, suites } = useContext(AppContext)
  const isDevEnv = config.environment === 'DEV'
  const isMobile = useIsMobile()

  const newSuite = {
    type: act_setDialog,
    payload: {
      Root: CreateSuite,
      description: 'Create a new test suite to organize your automated tests',
      title: 'Create Test Suite',
    },
  }

  const createTest = (id) => {
    setDialog({
      type: act_setDialog,
      payload: {
        Root: CreateTests,
        description: 'Build automated tests with assertions and validations',
        title: 'Create new test',
      },
    })
  }

  const editSuite = (id) => {
    setDialog({
      type: act_setDialog,
      payload: {
        Root: () => CreateSuite(id),
        title: 'Edit Test Suite',
        description:
          'Edit existing test suite to organize your automated tests',
      },
    })
  }

  return (
    <Section
      px={'3'}
      height={'100%'}
      width={'100%'}
      overflow={'auto'}
      className={'w-full'}
    >
      <Container>
        <Flex direction={'column'} gap={'4'}>
          <Flex justify={'between'} gap={'4'}>
            <Flex direction={'column'}>
              <Heading>Test automation</Heading>
              <Text>Create, organize, and run automated API tests</Text>
            </Flex>
            {isDevEnv && (
              <Button
                onClick={() => {
                  setDialog(newSuite)
                }}
              >
                <Plus />
                Create Suite
              </Button>
            )}
          </Flex>
          <Flex gap={'4'} direction={{ initial: 'column', sm: 'row' }}>
            <Card className={'w-full'}>
              <Flex justify={'between'} align={'center'}>
                <Flex direction={'column'}>
                  <Text>Test Suites</Text>
                  <Text size={'6'} weight={'medium'}>
                    {suites.length}
                  </Text>
                </Flex>
                <Folder className={'lg text-blue-500'} />
              </Flex>
            </Card>

            <Card className={'w-full'}>
              <Flex justify={'between'} align={'center'}>
                <Flex direction={'column'}>
                  <Text>Total Tests</Text>
                  <Text size={'6'} weight={'medium'}>
                    0
                  </Text>
                </Flex>
                <File className={'lg text-purple-500'} />
              </Flex>
            </Card>

            <Card className={'w-full'}>
              <Flex justify={'between'} align={'center'}>
                <Flex direction={'column'}>
                  <Text>Pass Rate</Text>
                  <Text size={'6'} weight={'medium'}>
                    --
                  </Text>
                </Flex>
                <CheckCircle2 className={'lg text-green-500'} />
              </Flex>
            </Card>

            <Card className={'w-full'}>
              <Flex justify={'between'} align={'center'}>
                <Flex direction={'column'}>
                  <Text>Last Run</Text>
                  <Text size={'6'} weight={'medium'}>
                    0
                  </Text>
                </Flex>
                <Folder className={'lg text-orange-500'} />
              </Flex>
            </Card>
          </Flex>
          <Flex direction={'column'} gap={'2'}>
            {isDevEnv && suites.length === 0 ? (
              <Card size={'3'}>
                <Flex direction={'column'} align={'center'} gap={'4'}>
                  <Folder className={'xxl'} />
                  <Flex direction={'column'} align={'center'} gap={'2'}>
                    <Text size={'6'} weight={'bold'}>
                      No test suits yet
                    </Text>
                    <Text align={'center'}>
                      Create your first test suite to organize and automate your
                      API tests
                    </Text>
                  </Flex>
                  <Button
                    onClick={() => {
                      setDialog(newSuite)
                    }}
                  >
                    <Plus />
                    Create Suite
                  </Button>
                </Flex>
              </Card>
            ) : (
              suites.map((suite) => {
                return (
                  <Card id={suite.id}>
                    <Collapsible.Root>
                      <Collapsible.Trigger
                        asChild
                        className={'collapse-trigger'}
                      >
                        <Flex direction={'column'}>
                          <Flex
                            justify={'between'}
                            gap={'4'}
                            className={'select-none'}
                          >
                            <Flex gap={'2'} align={'center'}>
                              <Box>
                                <ChevronRight className={'ico-closed'} />
                                <ChevronDown className={'ico-open'} />
                              </Box>
                              <FolderIcon className={'text-blue-500'} />
                              <Text size={'2'} className={'text-ellipsis'}>
                                {suite.title}
                              </Text>
                              <Badge radius="large" variant="surface">
                                {suite.tests?.length} tests
                              </Badge>
                            </Flex>
                            {!isMobile ? (
                              <Flex gap={'2'} align={'center'}>
                                <Button
                                  size={'2'}
                                  variant={'outline'}
                                  radius="large"
                                  onClick={createTest}
                                >
                                  <Plus /> Add test
                                </Button>
                                <Button>
                                  <PlayCircleIcon />
                                  Run Suite
                                </Button>
                                <IconButton
                                  variant="ghost"
                                  onClick={() => editSuite(suite.id)}
                                >
                                  <Edit />
                                </IconButton>
                                <IconButton variant="ghost">
                                  <Trash2 />
                                </IconButton>
                              </Flex>
                            ) : (
                              <DropdownMenu.Root>
                                <DropdownMenu.Trigger>
                                  <DropdownMenu.Trigger>
                                    <IconButton variant="ghost">
                                      <EllipsisVertical />
                                    </IconButton>
                                  </DropdownMenu.Trigger>
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Content
                                  style={{
                                    marginTop: '6px',
                                    marginRight: '6px',
                                  }}
                                >
                                  <DropdownMenu.Item>
                                    <PlayCircleIcon />
                                    Run Suite
                                  </DropdownMenu.Item>
                                  <DropdownMenu.Item onClick={createTest}>
                                    <PlusSquare /> Add test
                                  </DropdownMenu.Item>
                                  <DropdownMenu.Item
                                    onClick={() => editSuite(suite.id)}
                                  >
                                    <Edit />
                                    Edit
                                  </DropdownMenu.Item>
                                  <DropdownMenu.Separator />
                                  <DropdownMenu.Item
                                    color="red"
                                    onClick={() => console.log('Signed out!')}
                                  >
                                    <Trash2 />
                                    Delete
                                  </DropdownMenu.Item>
                                </DropdownMenu.Content>
                              </DropdownMenu.Root>
                            )}
                          </Flex>
                          <Text
                            size={'2'}
                            color="gray"
                            className={'text-ellipsis line-clamp-1'}
                          >
                            {suite.description}
                          </Text>
                        </Flex>
                      </Collapsible.Trigger>
                      <Collapsible.Content className={'CollapsibleContent'}>
                        {suite.tests.length > 0 && (
                          <Flex direction={'column'} gap={'2'} mt={'3'}>
                            <Card>
                              <Flex justify={'between'} gap={'4'}>
                                <Box>
                                  <Flex gap={'2'} align={'center'}>
                                    <File />
                                    <Flex gap={'1'}>
                                      <Text size={'2'}>Auth - should fail</Text>
                                      <Badge
                                        radius="large"
                                        color="green"
                                        variant="soft"
                                        className={'select-none'}
                                      >
                                        Get
                                      </Badge>
                                      <Text color="gray" size={'2'}>
                                        api/user/id
                                      </Text>
                                    </Flex>
                                  </Flex>
                                  <Badge
                                    variant="outline"
                                    radius="large"
                                    color="gray"
                                    className={'select-none'}
                                  >
                                    3 Assertions
                                  </Badge>
                                </Box>
                                <Flex>
                                  <Button
                                    variant="outline"
                                    size={{ initial: '1', md: '2' }}
                                    radius="large"
                                  >
                                    <Play />
                                    Run
                                  </Button>
                                </Flex>
                              </Flex>
                            </Card>
                          </Flex>
                        )}
                      </Collapsible.Content>
                    </Collapsible.Root>
                  </Card>
                )
              })
            )}
          </Flex>
        </Flex>
      </Container>
    </Section>
  )
}

export default index
