// @ts-nocheck
import {
  Badge,
  Box,
  Button,
  Card,
  Checkbox,
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
import { apiCall } from '../lib/request'
import { Fragment } from 'preact/jsx-runtime'

function SandBox({ activeRoute }: { activeRoute: any }) {
  const { headers: _headers, setHistory } = useContext(AppContext)
  const [requestBody, setRequestBody] = useState('')

  const [headers, setHeaders] = useState([])
  const [excludedHeaders, setExcludedHeaders] = useState([])
  const [fullPath, setFullPath] = useState('')

  const [response, setResponse] = useState()

  const [isValid, setIsValid] = useState(true)
  const [bCopied, setBCopied] = useState(false)

  useEffect(() => {
    setRequestBody(prettyJson(activeRoute?.body))
    setHeaders(_headers)
    setResponse(null)
    setFullPath(window.location.origin + activeRoute.path)
  }, [activeRoute, _headers])

  const onHeaderChange = (index: number, field: 'key' | 'value', value: string) => {
    setHeaders((prev) => {
      const next = [...prev]
      next[index] = { ...next[index], [field]: value }
      return next
    })
  }

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
      const _value = JSON.parse(requestBody)
      setRequestBody(prettyJson(_value))
      setIsValid(true)
    } catch {
      setIsValid(false)
    }
  }

  const removeHeader = (index) => {
    if (headers[index].key === '') return

    if (headers.length <= 1) {
      setHeaders([{ key: '', value: '' }])
      return
    }
    setHeaders((prev) => prev.filter((_, i) => i !== index))
  }

  const excludeHeader = (key, exclude) => {
    if (exclude) {
      setExcludedHeaders((prev) => [...prev, key])
      return
    }
    const headers = excludedHeaders.filter((h) => h !== key)
    setExcludedHeaders(headers)
  }

  const addHeader = () => {
    if (headers.length >= 10) return
    if (headers.some((header) => header.key === '')) return
    setHeaders((prev) => [...prev, { key: '', value: '' }])
  }

  const makeRequest = async () => {
    const headersObject = headers
      .filter((h) => h.key.trim() !== '' && !excludedHeaders.includes(h.key))
      .reduce((acc: any, h: any) => {
        acc[h.key] = h.value
        return acc
      }, {})

    const _response = await apiCall({
      method: activeRoute.method,
      fullPath,
      headers: headersObject,
      ...activeRoute,
      body: requestBody,
    })
    setResponse(_response)
    // addHistory(response)
  }

  const copy = () => {
    navigator.clipboard.writeText(
      prettyJson(response?.data || response?.error || '')
    )
    setBCopied(true)
    setTimeout(() => {
      setBCopied(false)
    }, 3000)
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
              value={fullPath}
              onChange={(e) => setFullPath(e.target.value)}
            ></TextField.Root>
          </Flex>
          <Box>
            <Flex justify={'between'} align={'center'}>
              <Text>Headers</Text>
              <Button
                size={'2'}
                variant="surface"
                radius="large"
                onClick={addHeader}
              >
                Add headers
              </Button>
            </Flex>
            <Flex gap={'2'} mt={'2'} direction={'column'}>
              {headers.map((header, index) => {
                return (
                  <Flex
                    key={index}
                    gap={'2'}
                    direction={{ initial: 'column', sm: 'row' }}
                    align={{ initial: 'center' }}
                    justify={'center'}
                  >
                    <Checkbox
                      size={'3'}
                      defaultChecked
                      onCheckedChange={(checked) =>
                        excludeHeader(header.key, !checked)
                      }
                    ></Checkbox>
                    <TextField.Root
                      placeholder={'Add header'}
                      className={'w-full'}
                      radius="large"
                      value={header.key}
                      onChange={(e: any) => onHeaderChange(index, 'key', e.target.value)}
                    ></TextField.Root>
                    <TextField.Root
                      placeholder={'Add value'}
                      className={'w-full'}
                      radius="large"
                      value={header.value}
                      onChange={(e: any) => onHeaderChange(index, 'value', e.target.value)}
                    ></TextField.Root>
                    <Button
                      variant="surface"
                      radius="large"
                      color="red"
                      onClick={() => removeHeader(index)}
                    >
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
                // @ts-ignore
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
          <Button
            className={'w-full'}
            radius="large"
            onClick={() => {
              makeRequest()
            }}
          >
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
                <Code color={getStatusColor(response.status)}>
                  {response.status}
                </Code>{' '}
                <Text>{response.statusText}</Text>
              </Text>
              <Button
                size={'2'}
                variant="outline"
                radius="large"
                color={bCopied ? 'green' : 'gray'}
                onClick={() => !bCopied && copy()}
              >
                {bCopied ? (
                  <Fragment>
                    <Check /> Copied
                  </Fragment>
                ) : (
                  <Fragment>
                    <Copy /> Copy
                  </Fragment>
                )}
              </Button>
            </Flex>
            <Separator mt={'2'} mb={'2'} size={'4'} />
            <Flex align={'center'} justify={'between'}>
              <Text>Response body</Text>
              <Text color="gray">{(response.timeout || 0).toFixed(2)} ms</Text>
            </Flex>
            <Code
              mt={'2'}
              className={
                'w-full h-48 overflow-auto language-json whitespace-pre-wrap break-all'
              }
            >
              {response.error}
              {response.status === 204 && 'No Content'}
              {response?.data ? prettyJson(response.data) : ''}
            </Code>
          </Flex>
        </Card>
      )}
    </Flex>
  )
}

export default SandBox
