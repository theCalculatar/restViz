import { useState, useEffect, useContext, useMemo } from 'preact/compat'
import {
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
  Play,
  Square,
  ChevronRight,
} from 'lucide-react'
import { singleTest } from '../../utils/testHelper'
import {
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Heading,
  Progress,
  Separator,
  Tabs,
  Text,
} from '@radix-ui/themes'
import { AppContext } from '../../context'
import { Accordion } from 'radix-ui'
import { useNavigate, useParams } from 'react-router-dom'

export function TestRunner() {
  const [currentTestIndex, setCurrentTestIndex] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const { suites } = useContext(AppContext)
  const { suitId } = useParams()

  const navigate = useNavigate()

  useEffect(() => {
    if (!suites.some((suite) => suite.id === suitId)) {
      navigate('/404')
      return
    }
  })

  const suite = suites.find((s) => s.id === suitId) || undefined

  const [results, setResults] = useState(() => {
    const tests = suite?.tests.map((test) => ({
      testId: test.id,
      title: test.title,
      status: 'pending',
      duration: 0,
      assertions: [],
    }))
    return tests
  })

  const runTests = async () => {
    setIsRunning(true)
    let resultsArray = []
    for (let i = 0; i < suite.tests.length; i++) {
      setCurrentTestIndex(i)
      setResults((prevResults) => {
        const newResults = [...prevResults]
        newResults[i] = {
          ...newResults[i],
          status: 'running',
        }
        return newResults
      })
      const response = await singleTest(suite.tests[i])
      resultsArray.push(response)
      setResults((prevResults) => {
        const newResults = [...prevResults]
        newResults[i] = response
        return newResults
      })
      setCurrentTestIndex(i)
    }
    setIsRunning(false)
    setCurrentTestIndex(0)
  }

  const { passedCount, failedCount, progress } = useMemo(() => {
    const passedCount = results?.filter((r) => r.status === 'passed').length
    const failedCount = results?.filter((r) => r.status === 'failed').length
    const progress = passedCount + failedCount
    return { passedCount, failedCount, progress }
  }, [results])

  return suite === undefined ? (
    <div className="flex-1 flex items-center justify-center">
      {/* Even though this never gets rendered, we just pleasing Babel :) */}
      <Text size={'3'}>Suite not found</Text>
    </div>
  ) : (
    <div className="flex-1 overflow-auto">
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <Heading size={'4'}>Suite Runner</Heading>
            {
              <Text as="p" size={'3'}>
                Running suite: <Text>{suite.title}</Text>
              </Text>
            }
          </div>
          <div className="flex gap-2">
            {isRunning ? (
              <Button
                variant="surface"
                onClick={() => setIsRunning(false)}
                className="gap-2"
                radius="large"
              >
                <Square className="w-4 h-4" />
                Stop
              </Button>
            ) : (
              <Button onClick={runTests} radius="large" className="gap-2">
                <Play className="w-4 h-4" />
                Start Tests
              </Button>
            )}
          </div>
        </div>

        {/* Progress Summary */}
        <Card>
          <Box>
            <Heading size={'3'}>Test Progress</Heading>
            <Text as="p" size={'2'} color="gray">
              {isRunning
                ? `Running test ${currentTestIndex + 1} of ${results.length}`
                : results.every((r) => r.status === 'pending')
                ? 'Ready to run tests'
                : `Completed ${passedCount + failedCount} of tests`}
            </Text>
          </Box>
          <Box className="space-y-4 mt-2">
            <Progress
              value={progress}
              max={suite.tests.length}
              className="h-2"
            />

            <Grid gap={'2'} columns={{ initial: '2', md: '4' }}>
              <Card>
                <div className="text-2xl font-bold">{suite.tests.length} </div>
                <div className="text-sm text-muted-foreground">Total Tests</div>
              </Card>
              <Card>
                <div className="text-2xl font-bold text-green-600">
                  {passedCount}
                </div>
                <div className="text-sm text-green-600">Passed</div>
              </Card>
              <Card>
                <div className="text-2xl font-bold text-red-600">
                  {failedCount}
                </div>
                <div className="text-sm text-red-600">Failed</div>
              </Card>
              <Card>
                <div className="text-2xl font-bold">
                  {results.reduce((sum, r) => sum + r.duration, 0)}ms
                </div>
                <div className="text-sm text-muted-foreground">Total Time</div>
              </Card>
            </Grid>
          </Box>
        </Card>

        <Accordion.Root type="single" collapsible>
          {/* Test Results */}
          <div className="space-y-3">
            {results.map((result, index) => {
              return (
                <Accordion.Item value={'item-' + index}>
                  <Card key={result.testId}>
                    <Accordion.Header>
                      <Accordion.Trigger
                        asChild
                        className={'accord transition-all duration-300'}
                      >
                        <Flex
                          align={'center'}
                          justify={'between'}
                          width={'100%'}
                        >
                          <Flex className="flex-1" gap={'2'} align={'center'}>
                            <ChevronRight className="w-4 h-4 ico" />

                            {result.status === 'passed' && (
                              <CheckCircle2 className="w-5 h-5 text-green-500" />
                            )}
                            {result.status === 'failed' && (
                              <XCircle className="w-5 h-5 text-red-500" />
                            )}
                            {result.status === 'running' && (
                              <Clock className="w-5 h-5 text-blue-500 animate-spin" />
                            )}
                            {result.status === 'pending' && (
                              <AlertCircle className="w-5 h-5 text-gray-400" />
                            )}

                            <Flex align={'center'} gap={'2'}>
                              <Text>{result.title}</Text>
                              {result.status !== 'pending' && (
                                <Badge
                                  color={
                                    result.status === 'passed'
                                      ? 'green'
                                      : result.status === 'running'
                                      ? 'blue'
                                      : 'red'
                                  }
                                  radius="large"
                                >
                                  {result.status}
                                </Badge>
                              )}
                              {result.duration > 0 && (
                                <Text size={'2'}>{result.duration}ms</Text>
                              )}
                            </Flex>
                          </Flex>
                        </Flex>
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content className={'CollapsibleContent'}>
                      {result.status !== 'pending' && (
                        <Tabs.Root defaultValue="assertions">
                          <Tabs.List mb={'4'}>
                            <Tabs.Trigger value="assertions">
                              Assertions ({result.assertions?.length})
                            </Tabs.Trigger>
                            {result.response && (
                              <>
                                <Tabs.Trigger value="response">
                                  Response
                                </Tabs.Trigger>
                                <Tabs.Trigger value="headers">
                                  Headers
                                </Tabs.Trigger>
                              </>
                            )}
                            {result.error && (
                              <Tabs.Trigger value="error">Error</Tabs.Trigger>
                            )}
                          </Tabs.List>

                          <Tabs.Content
                            value="assertions"
                            className="space-y-2"
                          >
                            {result.assertions?.length === 0 ? (
                              <Text size={'2'} color="gray">
                                No assertions defined
                              </Text>
                            ) : (
                              result.assertions?.map((assertion) => (
                                <Box
                                  key={assertion.id}
                                  className={`p-3 border rounded-lg ${
                                    assertion.passed
                                      ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800'
                                      : 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800'
                                  }`}
                                >
                                  <div className="flex items-start gap-2">
                                    {assertion.passed ? (
                                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                                    ) : (
                                      <XCircle className="w-4 h-4 text-red-600 mt-0.5" />
                                    )}
                                    <div className="flex-1">
                                      <Text weight={'medium'}>
                                        {assertion.message}
                                      </Text>
                                      {!assertion.passed && (
                                        <Box className="mt-2 text-xs font-mono space-y-1">
                                          <Text as="div">
                                            Expected:{' '}
                                            <Text color="green">
                                              {assertion.expected}
                                            </Text>
                                          </Text>
                                          <Text as="div">
                                            Actual:{' '}
                                            <Text color="red">
                                              {assertion.actual}
                                            </Text>
                                          </Text>
                                        </Box>
                                      )}
                                    </div>
                                  </div>
                                </Box>
                              ))
                            )}
                          </Tabs.Content>

                          {result.response && (
                            <>
                              <Tabs.Content value="response">
                                <div className="space-y-3">
                                  <Flex gap={'2'} align={'center'}>
                                    <Badge>{result.response.status}</Badge>
                                    <Text size={'2'}>
                                      {result.response.statusText}
                                    </Text>
                                    <Text size={'2'} className="ml-auto">
                                      {result.response.time}/ms
                                    </Text>
                                  </Flex>
                                  <Separator size={'4'} />
                                  <Card>
                                    <pre className="text-xs overflow-auto">
                                      {JSON.stringify(
                                        result.response.body,
                                        null,
                                        2
                                      )}
                                    </pre>
                                  </Card>
                                </div>
                              </Tabs.Content>

                              <Tabs.Content value="headers">
                                <Box className="space-y-2">
                                  {Object.entries(result.response.headers).map(
                                    ([key, value]) => (
                                      <Card key={key}>
                                        <Text size={'2'} weight={'medium'}>
                                          {key}:
                                        </Text>
                                        <Text size={'2'} ml={'1'}>
                                          {value}
                                        </Text>
                                      </Card>
                                    )
                                  )}
                                </Box>
                              </Tabs.Content>
                            </>
                          )}

                          {result.error && (
                            <Box>
                              <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
                                <Text size={'2'}>{result.error}</Text>
                              </div>
                            </Box>
                          )}
                        </Tabs.Root>
                      )}
                      <Flex gap={'2'} mt={'2'}>
                        <Button
                          variant="surface"
                          size={'1'}
                          radius="large"
                          // onClick={}
                        >
                          Run Test
                        </Button>
                      </Flex>
                    </Accordion.Content>
                  </Card>
                </Accordion.Item>
              )
            })}
          </div>
        </Accordion.Root>
      </div>
    </div>
  )
}
