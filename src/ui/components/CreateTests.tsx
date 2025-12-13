import {
  Badge,
  Box,
  Button,
  Card,
  Flex,
  IconButton,
  Popover,
  ScrollArea,
  Select,
  Text,
  TextArea,
  TextField,
} from '@radix-ui/themes'
import {
  ChevronRight,
  CircleCheckBig,
  Link,
  Save,
  Search,
  Trash2,
  Unlink,
} from 'lucide-react'
import { useContext, useState } from 'preact/hooks'
import { Test, TestAssertion } from '../types/suites'
import { methodColors } from '../utils/colors'
import { AppContext } from '../context'
import {
  act_addSuitTest,
  act_dismissDialog,
  act_editSuitTest,
} from '../context/actions'

function CreateTests(suiteId: string, test_: Test) {
  const { routes, setSuite, setDialog } = useContext(AppContext)
  const [routesLink, setRoutesLink] = useState(routes)

  const [test, setTest] = useState<Partial<Test>>(
    test_ || {
      id: Date.now().toString(),
      method: 'GET',
      assertions: [],
    }
  )

  const [assertion, setAssertion] = useState<TestAssertion>({
    id: Date.now().toString(),
    type: 'code',
    value: '200',
    operator: 'equals',
  })

  const addAssertion = () => {
    test.assertions.push(assertion)
    setAssertion({
      id: Date.now().toString(),
      type: 'code',
      value: '200',
      operator: 'equals',
    })
  }

  const removeAssertion = (assertionId: string) => {
    const newAssertion = test.assertions.filter((as_) => as_.id !== assertionId)
    setTest({ ...test, assertions: newAssertion })
  }

  const filterRoutes = (q: string) => {
    setRoutesLink(routes.filter((route) => route.path.includes(q)))
  }

  const saveTest = () => {
    setSuite({
      type: !test_ ? act_addSuitTest : act_editSuitTest,
      payload: { id: suiteId, test: test },
    })
    setDialog({ type: act_dismissDialog })
  }

  return (
    <Box mt={'4'} className={'lg:w-[40rem] w-full'}>
      <Flex direction={'column'} gap={'4'}>
        <Card>
          <Flex direction={'column'} gap={'4'}>
            <Flex justify={'between'}>
              <Flex direction={'column'}>
                <Text>Test information</Text>
                <Text color="gray" size={'2'}>
                  Basic info about your test
                </Text>
              </Flex>
              <Popover.Root>
                <Popover.Trigger>
                  {test.link ? (
                    <IconButton variant="surface" radius="large" color="green">
                      <Link />
                    </IconButton>
                  ) : (
                    <IconButton variant="surface" radius="large">
                      <Unlink />
                    </IconButton>
                  )}
                </Popover.Trigger>
                <Popover.Content width="300px">
                  <Flex direction={'column'}>
                    <Box pb={'2'}>
                      <Text color="gray" size={'2'}>
                        Search endpoint to link.
                      </Text>
                      <TextField.Root
                        radius="large"
                        onChange={(value) => {
                          filterRoutes(value.currentTarget.value)
                        }}
                      >
                        <TextField.Slot>
                          <Search />
                        </TextField.Slot>
                      </TextField.Root>
                    </Box>
                    <ScrollArea className={'max-h-72'}>
                      <Flex direction={'column'} gap={'2'}>
                        {routesLink.map((route, index) => {
                          return (
                            <Popover.Close
                              onClick={() => {
                                if (route.url !== test.link) {
                                  setTest({
                                    ...test,
                                    link: route.url,
                                    method: route.method,
                                    endpoint: route.path,
                                    body: JSON.stringify(route.body) || '',
                                  })
                                }
                              }}
                              key={index}
                            >
                              <Card
                                style={{
                                  background:
                                    route.url === test.link && '#81818161',
                                }}
                              >
                                <Flex
                                  key={index}
                                  justify={'between'}
                                  align={'center'}
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
                                  <ChevronRight />
                                </Flex>
                              </Card>
                            </Popover.Close>
                          )
                        })}
                      </Flex>
                    </ScrollArea>
                  </Flex>
                </Popover.Content>
              </Popover.Root>
            </Flex>
            <Flex gap={'2'} direction={'column'}>
              <Flex direction={'column'}>
                <label htmlFor="test-name" className={'text-sm'}>
                  Test Name
                </label>
                <TextField.Root
                  placeholder={'e.g. Validates users endpoints'}
                  radius="large"
                  id="test-name"
                  value={test.title}
                  onChange={(value) => {
                    setTest({ ...test, title: value.currentTarget.value })
                  }}
                ></TextField.Root>
              </Flex>
              <Flex direction={'column'}>
                <label htmlFor="test-description" className={'text-sm'}>
                  Test Description
                </label>
                <TextArea
                  placeholder={'Describe what the test does.'}
                  id="test-description"
                  radius="large"
                  value={test.description}
                  onChange={(value) => {
                    setTest({ ...test, description: value.currentTarget.value })
                  }}
                ></TextArea>
              </Flex>
            </Flex>
          </Flex>
        </Card>
        <Card>
          <Flex direction={'column'} gap={'4'}>
            <Flex direction={'column'}>
              <Text>Request configuration</Text>
              <Text color="gray" size={'2'}>
                Configure the API request to test
              </Text>
            </Flex>
            <Flex gap={'2'}>
              <Select.Root
                value={test.method}
                onValueChange={(value) => {
                  setTest({
                    ...test,
                    method: value.toLocaleUpperCase() as any,
                  })
                }}
              >
                <Select.Trigger radius="large" />
                <Select.Content>
                  <Select.Item value="GET">GET</Select.Item>
                  <Select.Item value="PUT">PUT</Select.Item>
                  <Select.Item value="DELETE">DELETE</Select.Item>
                  <Select.Item value="PATCH">PATCH</Select.Item>
                  <Select.Item value="POST">POST</Select.Item>
                </Select.Content>
              </Select.Root>
              <TextField.Root
                placeholder="/api/users"
                className={'w-full'}
                radius="large"
                value={test.endpoint}
                onChange={(value) => {
                  setTest({
                    ...test,
                    endpoint: value.currentTarget.value,
                  })
                }}
              ></TextField.Root>
            </Flex>
            <Flex>
              <Text size={'2'}>Headers</Text>
              {/* <div className="text-rose-500">
                To add after sandbox. im unto something...
              </div> */}
            </Flex>
            {test.method !== 'GET' && test.method !== 'DELETE' && (
              <Flex direction={'column'}>
                <Text size={'2'}>Request body</Text>
                <TextArea
                  radius="large"
                  placeholder={
                    '{"name":"Jone DOe", "email":"example@gmail.com"}'
                  }
                  value={test.body}
                  onChange={(value) => {
                    setTest({ ...test, body: value.currentTarget.value })
                  }}
                />
              </Flex>
            )}
          </Flex>
        </Card>
        <Card>
          <Flex gap={'4'} direction={'column'}>
            <Flex direction={'column'}>
              <Text>Assertions</Text>
              <Text color="gray" size={'2'}>
                Define what success looks like for this test
              </Text>
            </Flex>
            <Flex gap={'4'} direction={'column'}>
              {test?.assertions.map((assertion, key) => {
                return (
                  <Card key={key}>
                    <Flex justify={'between'} align={'center'}>
                      <Flex gap={'2'} align={'center'}>
                        <CircleCheckBig className={'text-green-500'} />
                        <Badge size={'1'} radius="large" variant="outline">
                          {assertion.type}
                        </Badge>
                        <Text weight={'medium'} size={'2'}>
                          {assertion.field}
                        </Text>
                        <Text color={'gray'} size={'1'}>
                          {assertion.operator}
                        </Text>
                        <Text weight={'medium'} size={'2'}>
                          {assertion.value}
                        </Text>
                      </Flex>
                      <IconButton
                        variant="ghost"
                        onClick={() => removeAssertion(assertion.id)}
                      >
                        <Trash2 />
                      </IconButton>
                    </Flex>
                  </Card>
                )
              })}
            </Flex>

            <Card>
              <Flex direction={'column'} gap={'4'}>
                <Flex justify={'between'} align={'center'}>
                  <Text size={'2'}>Add assertions</Text>
                  <Button
                    radius="large"
                    size={'1'}
                    onClick={() => {
                      if (assertion.value) {
                        if (
                          assertion.type === 'body' ||
                          assertion.type === 'header'
                        ) {
                          if (!assertion.field) {
                            return
                          }
                          addAssertion()
                          return
                        }
                        addAssertion()
                      }
                    }}
                  >
                    <Save /> Save
                  </Button>
                </Flex>
                <Flex gap={'2'} direction={{ md: 'row', initial: 'column' }}>
                  <Select.Root
                    value={assertion.type}
                    onValueChange={(value) => {
                      setAssertion({ ...assertion, type: value as any })
                    }}
                  >
                    <Select.Trigger radius="large" />
                    <Select.Content>
                      <Select.Item value="code">Status Code</Select.Item>
                      <Select.Item value="header">Response Header</Select.Item>
                      <Select.Item value="body">Response Body</Select.Item>
                      <Select.Item value="time">Response Time</Select.Item>
                    </Select.Content>
                  </Select.Root>
                  {(assertion.type === 'body' ||
                    assertion.type === 'header') && (
                    <TextField.Root
                      radius="large"
                      className={'w-full'}
                      placeholder={'field path'}
                      value={assertion.field}
                      onChange={(value) => {
                        setAssertion({
                          ...assertion,
                          field: value.currentTarget.value,
                        })
                      }}
                    />
                  )}
                  <Select.Root
                    value={assertion.operator}
                    onValueChange={(value) => {
                      setAssertion({ ...assertion, operator: value as any })
                    }}
                  >
                    <Select.Trigger radius="large" />
                    <Select.Content>
                      <Select.Item value="equals">Equal</Select.Item>
                      <Select.Item value="contains">Contains</Select.Item>
                      <Select.Item value="greater">Greater Than</Select.Item>
                      <Select.Item value="less">Less Than</Select.Item>
                    </Select.Content>
                  </Select.Root>
                  <TextField.Root
                    radius="large"
                    className={'w-full'}
                    placeholder={'Expected value'}
                    value={assertion.value}
                    onChange={(value: any) => {
                      setAssertion({
                        ...assertion,
                        value: value.currentTarget.value,
                      })
                    }}
                  />
                </Flex>
              </Flex>
            </Card>

            <Box>
              <Text as="p" size={'2'} color="gray">
                Save test Edge-cases with all assertions.
              </Text>
              <Button radius="large" onClick={saveTest}>
                <Save /> Save
              </Button>
            </Box>
          </Flex>
        </Card>
      </Flex>
    </Box>
  )
}

export default CreateTests
