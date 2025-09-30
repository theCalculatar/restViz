import {
  Box,
  Button,
  Callout,
  Card,
  Container,
  Heading,
  Section,
  Separator,
  Switch,
  Tabs,
  Text,
  TextArea,
  TextField,
} from '@radix-ui/themes'
import { Flex } from '@radix-ui/themes/src/index.js'
import { Download, InfoIcon, Repeat, Save, Upload, X } from 'lucide-react'
import { useContext, useState } from 'preact/hooks'
import { AppContext } from '../../context'
import { act_setConfigtTheme, act_setHeaders } from '../../context/actions'

function Settings() {
  // @ts-ignore
  const { headers, setHeaders, config, setConfig } = useContext(AppContext)
  const [localHeaders, setLocalHeaders] = useState(headers)

  const addHeader = () => {
    if (localHeaders.length >= 10) return
    if (localHeaders.some((header) => header.key === '')) return
    setLocalHeaders((prev) => [...prev, { key: '', value: '' }])
  }

  const removeHeader = (index) => {
    if (localHeaders[index].key === '') return

    if (localHeaders.length <= 1) {
      setLocalHeaders([{ key: '', value: '' }])
      return
    }
    setLocalHeaders((prev) => prev.filter((_, i) => i !== index))
  }

  const onHeaderChange = (index, field, value) => {
    const updatedHeaders = [...localHeaders]
    updatedHeaders[index][field] = value
    setLocalHeaders(updatedHeaders)
  }

  const saveSettings = () => {
    setHeaders({ type: act_setHeaders, payload: localHeaders })
  }

  return (
    <Section
      p={'3'}
      height={'100%'}
      width={'100%'}
      overflow={'auto'}
      className={'w-full'}
    >
      <Container size={{ md: '3', xl: '4', sm: '3', initial: '1' }}>
        <Heading size={'4'}>Settings</Heading>
        <Text color="gray" mt={'2'}>
          Configure your API documentation preferences and display options.
        </Text>
        <Flex direction={'column'} gap={'4'} mt={'4'}>
          <Tabs.Root
            defaultValue="account"
            orientation={'vertical'}
            className={'outline-none border-none'}
          >
            <Tabs.List className={'outline-none border-none'}>
              <Tabs.Trigger value="account">General</Tabs.Trigger>
              <Tabs.Trigger value="api">Request</Tabs.Trigger>
              <Tabs.Trigger value="other">Advanced</Tabs.Trigger>
            </Tabs.List>

            <Box pt="3">
              <Tabs.Content value="account" className={''}>
                <Flex direction={'column'} gap="2">
                  <Card>
                    <Flex direction={'column'} mb="2">
                      <Text>Documantation info</Text>
                      <Text size="2" color="gray">
                        Basic information about your API documentation.
                      </Text>
                    </Flex>
                    <Flex direction={'column'} gap="2">
                      <Box>
                        <Text size="2" mb="1">
                          API title
                        </Text>
                        <TextField.Root
                          disabled
                          radius="large"
                          type="text"
                          value={config.name}
                          placeholder="Enter documentation title"
                        />
                      </Box>
                      <Box>
                        <Flex
                          width={'100%'}
                          direction={{ initial: 'column', lg: 'row' }}
                          gap="4"
                        >
                          <Box flexGrow={'1'}>
                            <Text size="2">Version</Text>
                            <TextField.Root
                              disabled
                              radius="large"
                              type="text"
                              value={config.version}
                              placeholder="1.0.0"
                            />
                          </Box>
                          <Box flexGrow={'1'}>
                            <Text size="2">Base Url</Text>
                            <TextField.Root
                              disabled
                              radius="large"
                              type="text"
                              value={config.baseUrl}
                              placeholder="MIT"
                            />
                          </Box>
                        </Flex>
                      </Box>
                      <Box>
                        <Text size="2">Description</Text>
                        <TextArea
                          radius="large"
                          placeholder="Enter documentation description"
                          disabled
                          value={config.description}
                        />
                      </Box>
                    </Flex>
                  </Card>
                  <Card>
                    <Flex direction={'column'} mb="2">
                      <Text>Backup & restore</Text>
                      <Text size="2" color="gray">
                        Export or import your settings configuration.
                      </Text>
                    </Flex>
                    <Flex direction={'column'} gap="2" mt={'4'}>
                      <Flex gap={'2'}>
                        <Button size={'2'} radius="large">
                          <Upload />
                          Export settings
                        </Button>
                        <Button size={'2'} variant="surface" radius="large">
                          <Download />
                          Import settings
                        </Button>
                      </Flex>
                    </Flex>
                  </Card>
                </Flex>
              </Tabs.Content>

              <Tabs.Content value="api">
                <Flex direction={'column'} gap="2">
                  <Card>
                    <Flex direction={'column'} mb="2">
                      <Text>Request Settings</Text>
                      <Text size="2" color="gray">
                        Configure default settings for API requests.
                      </Text>
                    </Flex>
                    <Flex direction={{ initial: 'column', sm: 'row' }} gap="2">
                      <Box flexGrow={'1'}>
                        <Text size="2">Timeout (ms)</Text>
                        <TextField.Root
                          disabled
                          radius="large"
                          type="number"
                          value={config.timeout}
                          placeholder="5000"
                        />
                      </Box>
                      <Box flexGrow={'1'}>
                        <Text size="2">Retries</Text>
                        <TextField.Root
                          disabled
                          radius="large"
                          type="number"
                          value={config.retries}
                          placeholder="3"
                        />
                      </Box>
                    </Flex>
                  </Card>
                  <Card>
                    <Flex justify={'between'} mb="2">
                      <Flex direction={'column'}>
                        <Text>Default Headers</Text>
                        <Text size="2" color="gray">
                          Headers that will be included with every request.
                        </Text>
                      </Flex>
                      <Button
                        size={'2'}
                        variant="surface"
                        radius="large"
                        onClick={addHeader}
                      >
                        Add header
                      </Button>
                    </Flex>
                    <Box>
                      <Text size={'2'} mb={'2'}>
                        Custom Headers(JSON)
                      </Text>
                      <Card>
                        <Flex gap={'2'} direction={'column'}>
                          {localHeaders?.map((header, key) => {
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
                                  value={header.key}
                                  onChange={(e) => {
                                    // @ts-ignore
                                    onHeaderChange(key, 'key', e.target.value)
                                  }}
                                ></TextField.Root>
                                <TextField.Root
                                  placeholder={'Add value'}
                                  className={'w-full'}
                                  radius="large"
                                  value={header.value}
                                  onChange={(e) => {
                                    // @ts-ignore
                                    onHeaderChange(key, 'value', e.target.value)
                                  }}
                                ></TextField.Root>
                                <Button
                                  variant="surface"
                                  radius="large"
                                  color="red"
                                  onClick={() => removeHeader(key)}
                                >
                                  <X />
                                </Button>
                              </Flex>
                            )
                          })}
                        </Flex>
                      </Card>
                    </Box>
                    <Callout.Root mt={'4'} variant="outline">
                      <Callout.Icon>
                        <InfoIcon />
                      </Callout.Icon>
                      <Callout.Text>
                        <Text size={'3'}>Security Notice</Text>
                      </Callout.Text>
                      <Callout.Text>
                        <Text size={'2'} color="gray">
                          Authentication tokens are stored locally in your
                          browser. Never share your settings export with
                          sensitive credentials.
                        </Text>
                      </Callout.Text>
                    </Callout.Root>
                  </Card>
                  <Flex align={'end'} gap={'4'} mt={'2'} direction={'column'}>
                    <Separator orientation={'horizontal'} size={'4'} />
                    <Button onClick={saveSettings}>
                      <Save /> Save settings
                    </Button>
                  </Flex>
                </Flex>
              </Tabs.Content>

              <Tabs.Content value="other">
                <Flex direction={'column'} gap="2">
                  <Card>
                    <Flex direction={'column'} mb="2">
                      <Text>Theme</Text>
                      <Text size="2" color="gray">
                        Customize the visual appearance of the interface.{' '}
                      </Text>
                    </Flex>
                    <Flex justify={'between'} mt={'2'}>
                      <Flex direction={'column'}>
                        <Text>Dark mode</Text>
                        <Text size={'2'} color="gray">
                          Toggle between light and dark themes
                        </Text>
                      </Flex>
                      <Switch
                        radius="large"
                        checked={config.theme === 'dark'}
                        onClick={() => {
                          setConfig({ type: act_setConfigtTheme })
                        }}
                      ></Switch>
                    </Flex>
                  </Card>
                  <Card>
                    <Flex direction={'column'} mb="4">
                      <Text>Perfomance</Text>
                      <Text size="2" color="gray">
                        Optimize performance and memory usage.
                      </Text>
                    </Flex>
                    <Flex direction={'column'} align={'start'} gap="2">
                      <Button variant="surface" radius="large">
                        <Repeat /> Clear Cache
                      </Button>
                      <Text size={'2'} color="gray">
                        Clear all cached API responses and stored data.
                      </Text>
                    </Flex>
                  </Card>
                </Flex>
              </Tabs.Content>
            </Box>
          </Tabs.Root>
        </Flex>
      </Container>
    </Section>
  )
}

export default Settings
