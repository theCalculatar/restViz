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
  PlayCircleIcon,
  Plus,
  PlusSquare,
  Trash2,
} from 'lucide-react'
import { useContext } from 'preact/hooks'
import { AppContext } from '../../context'
import {
  act_deleteSuit,
  act_deleteSuitTest,
  act_setDialog,
} from '../../context/actions'
import CreateSuite from '../../components/CreateSuite'
import CreateTests from '../../components/CreateTests'
import { useIsMobile } from '../../hooks/useMobile'
import { Collapsible } from 'radix-ui'
import { methodColors } from '../../utils/colors'
import { Link } from 'react-router-dom'
import { Suite } from '../../types/suites'

function SuitPage() {
  const { config, setDialog, suites, setSuite } = useContext(AppContext)
  const isDevEnv = config.environment === 'DEV'
  const isMobile = useIsMobile()
  const lastRun = localStorage.getItem('lastRun')
    ? new Date(JSON.parse(localStorage.getItem('lastRun') || '""')).toLocaleDateString()
    : '--'

  const passRateVal = (() => {
    try {
      const stored = localStorage.getItem('passRate')
      return stored ? JSON.parse(stored)?.passRate || 0 : 0
    } catch (_) {
      return 0
    }
  })()
  const passRate = Math.round(passRateVal * 100)

  const totalTests = (suites || []).reduce((acc: number, suite: Suite) => acc + (suite.tests || []).length, 0)

  const newSuite = {
    type: act_setDialog,
    payload: {
      Root: CreateSuite,
      description: 'Create a new test suite to organize your automated tests',
      title: 'Create Test Suite',
    },
  }

  const createTest = (id: string) => {
    setDialog({
      type: act_setDialog,
      payload: {
        Root: () => CreateTests(id, null),
        description: 'Build automated tests with assertions and validations',
        title: 'Create new test',
      },
    })
  }

  const updateTest = (id: string, test: any) => {
    setDialog({
      type: act_setDialog,
      payload: {
        Root: () => CreateTests(id, test),
        description: 'Edit your automated tests assertions and validations',
        title: 'Update your test',
      },
    })
  }

  const editSuite = (id: string) => {
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

  const deleteSuite = (id: string) => {
    setSuite({
      type: act_deleteSuit,
      payload: {
        id,
      },
    })
  }

  const deleteTest = (id: string, testId: string) => {
    setSuite({
      type: act_deleteSuitTest,
      payload: {
        id,
        testId,
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
      <Container size={{ md: '3', xl: '4', sm: '3', initial: '1' }}>
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
                    {totalTests}
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
                    {passRate}%
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
                    {lastRun}
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
                      No test suites yet
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
              suites.map((suite: Suite) => {
                return (
                  <Card id={suite.id} key={suite.id}>
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
                                  size={'1'}
                                  variant={'outline'}
                                  radius="large"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    createTest(suite.id)
                                  }}
                                >
                                  <Plus /> Add test
                                </Button>
                                <Button size={'1'} asChild onClick={(e) => e.stopPropagation()}>
                                  <Link to={suite.id}>
                                    <PlayCircleIcon />
                                    Run Suite
                                  </Link>
                                </Button>
                                <IconButton
                                  variant="ghost"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    editSuite(suite.id)
                                  }}
                                >
                                  <Edit />
                                </IconButton>
                                <IconButton
                                  variant="ghost"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    deleteSuite(suite.id)
                                  }}
                                >
                                  <Trash2 />
                                </IconButton>
                              </Flex>
                            ) : (
                              <DropdownMenu.Root>
                                <DropdownMenu.Trigger>
                                  <IconButton variant="ghost" onClick={(e) => e.stopPropagation()}>
                                    <EllipsisVertical />
                                  </IconButton>
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Content
                                  style={{
                                    marginTop: '6px',
                                    marginRight: '6px',
                                  }}
                                >
                                  <DropdownMenu.Item asChild>
                                    <Link to={suite.id}>
                                      <PlayCircleIcon />
                                      Run Suite
                                    </Link>
                                  </DropdownMenu.Item>
                                  <DropdownMenu.Item
                                    onClick={() => createTest(suite.id)}
                                  >
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
                                    onClick={() => deleteSuite(suite.id)}
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
                        {suite.tests && suite.tests.length > 0 && (
                          <Flex direction={'column'} gap={'2'} mt={'3'}>
                            {suite.tests.map((test) => {
                              return (
                                <Card key={test.id}>
                                  <Flex justify={'between'} gap={'4'}>
                                    <Box>
                                      <Flex gap={'2'} align={'center'}>
                                        <File />
                                        <Flex gap={'1'}>
                                          <Text size={'2'}>{test.title}</Text>
                                          <Badge
                                            radius="large"
                                            variant="soft"
                                            className={'select-none'}
                                            color={methodColors[test.method] as any}
                                          >
                                            {test.method}
                                          </Badge>
                                          <Text color="gray" size={'2'}>
                                            {test.endpoint}
                                          </Text>
                                        </Flex>
                                      </Flex>
                                      <Badge
                                        variant="outline"
                                        radius="large"
                                        color="gray"
                                        className={'select-none'}
                                      >
                                        {test.assertions?.length} Assertions
                                      </Badge>
                                    </Box>
                                    <Flex gap={'1'}>
                                      <Button
                                        variant="outline"
                                        radius="large"
                                        onClick={() => {
                                          updateTest(suite.id, test)
                                        }}
                                      >
                                        <Edit />
                                        Edit
                                      </Button>
                                      <Button
                                        variant="outline"
                                        radius="large"
                                        onClick={() =>
                                          deleteTest(suite.id, test.id)
                                        }
                                      >
                                        <Trash2 />
                                        Delete
                                      </Button>
                                    </Flex>
                                  </Flex>
                                </Card>
                              )
                            })}
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

export default SuitPage
