import {
  Badge,
  Box,
  Button,
  Card,
  Code,
  Flex,
  Separator,
  Text,
  TextArea,
  TextField,
} from '@radix-ui/themes'
import { Check, Copy, FileText, Play, X } from 'lucide-react'
import { AppContext } from '../context'
import { useContext, useEffect, useState } from 'preact/hooks'
import { getStatusColor, methodColors } from '../utils/colors'
import { prettyJson } from '../utils/json'

function SandBox() {
  const { activeRoute } = useContext(AppContext)
  const [requestBody, setRequestBody] = useState('')

  const [response, setResponse] = useState({
    code: 200,
    status: 'OK',
    body: {
      id: 3,
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'user',
      created_at: new Date().toISOString(),
    },
  })

  const [isValid, setIsValid] = useState(true)

  useEffect(() => {
    setRequestBody(prettyJson(activeRoute?.body))
  }, [activeRoute])

  const validateJson = (value) => {
    if (!value.trim()) {
      setIsValid(true)
      return
    }

    try {
      JSON.parse(value)
      setIsValid(true)
    } catch {
      setIsValid(false)
    }
  }

  const handleBodyChange = (value) => {
    setRequestBody(value)
    validateJson(value)
  }

  const formatJson = () => {
    try {
      setRequestBody(prettyJson(requestBody))
      setIsValid(true)
    } catch {
      // Keep current value if invalid
    }
  }

  return (
    <Flex className={'w-full'} direction={'column'} gap={'4'}>
      <Card>
        <Flex direction={'column'} gap={'4'}>
          <Box>
            <Flex gap={'2'} align={'center'}>
              <Badge radius="full" color={'blue'} size={'3'}>
                <Play></Play>
              </Badge>
              <Text className={'capitalize'}>Try it out</Text>
            </Flex>
            <Text size={'2'} color="gray">
              Test this endpoint with custom parameters and request body.
            </Text>
          </Box>
          <Flex gap={'2'} mt={'2'} align={'center'}>
            <Badge
              radius="large"
              size={'3'}
              color={methodColors[activeRoute.method]}
              className={
                'min-w-14 flex justify-center place-items-center text-center'
              }
            >
              {activeRoute.method}
            </Badge>
            <TextField.Root
              placeholder="Enter request URL"
              radius="large"
              className={'w-full'}
              value={window.location.origin + activeRoute.path}
            ></TextField.Root>
          </Flex>
          <Box>
            <Flex justify={'between'} align={'center'}>
              <Text>Headers</Text>
              <Button size={'2'} variant="surface" radius="large">
                Add headers
              </Button>
            </Flex>
            <Flex gap={'2'} mt={'2'} direction={'column'}>
              {[0, 2, 3].map((item) => {
                return (
                  <Flex
                    gap={'2'}
                    direction={{ initial: 'column', sm: 'row' }}
                    align={{ initial: 'start' }}
                  >
                    <TextField.Root
                      placeholder={'Add header'}
                      className={'w-full'}
                      radius="large"
                    ></TextField.Root>
                    <TextField.Root
                      placeholder={'Add value'}
                      className={'w-full'}
                      radius="large"
                    ></TextField.Root>
                    <Button variant="surface" radius="large" color="red">
                      <X />
                    </Button>
                  </Flex>
                )
              })}
            </Flex>
          </Box>

          {activeRoute.method !== 'GET' && activeRoute.method !== 'DELETE' && (
            <Box>
              <Flex justify={'between'} align={'center'}>
                <Box>
                  <Flex>
                    <FileText className="h-5 w-5" />
                    <Text>Request Body</Text>
                  </Flex>
                  <Text size={'1'} color="gray">
                    JSON payload for the {activeRoute.method} request
                  </Text>
                </Box>
                <Flex align={'center'} gap={'2'}>
                  {isValid ? (
                    <Badge variant="soft" color="green" size={'2'}>
                      <Check className="h-3 w-3" />
                      Valid JSON
                    </Badge>
                  ) : (
                    <Badge
                      variant="soft"
                      color="red"
                      className="gap-1"
                      size={'2'}
                    >
                      <X className="h-3 w-3" />
                      Invalid JSON
                    </Badge>
                  )}
                  <Button
                    variant="outline"
                    radius="large"
                    size="1"
                    onClick={formatJson}
                    disabled={!isValid}
                  >
                    Format
                  </Button>
                </Flex>
              </Flex>
              <TextArea
                radius="large"
                mt={'2'}
                value={requestBody}
                onChange={(e) => handleBodyChange(e.target.value)}
                placeholder="Enter JSON request body..."
                rows={6}
              />
              <Box height={'20px'}>
                {!isValid && (
                  <Text size={'1'} color="red">
                    Invalid JSON syntax. Please check your formatting.
                  </Text>
                )}
              </Box>
            </Box>
          )}
          <Button className={'w-full'} radius="large" disabled={!isValid}>
            <Play />
            Send Request
          </Button>
        </Flex>
      </Card>

      {response && (
        <Card className={'w-full'}>
          <Flex direction={'column'} className={'w-full'} gap={'2'}>
            <Flex justify={'between'} align={'center'}>
              <Text>
                Response:{' '}
                <Code color={getStatusColor(response.code)}>
                  {response.code}
                </Code>{' '}
                <Text>{response.status}</Text>
              </Text>
              <Button size={'2'} variant="outline" radius="large" color="gray">
                <Copy /> Copy
              </Button>
            </Flex>
            <Separator mt={'2'} mb={'2'} size={'4'} />
            <Text color="gray">Response body</Text>
            <Code
              mt={'2'}
              className={
                'w-full h-48 overflow-auto language-json whitespace-pre-wrap break-all'
              }
            >
              {prettyJson(response.body)}
            </Code>
          </Flex>
        </Card>
      )}
    </Flex>
  )
}

export default SandBox
