import {
  Box,
  Button,
  Card,
  Flex,
  IconButton,
  Select,
  Text,
  TextArea,
  TextField,
} from '@radix-ui/themes'
import { Link, Save } from 'lucide-react'

function CreateTests() {
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
              <IconButton variant="surface" radius="large">
                <Link />
              </IconButton>
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
              <Select.Root defaultValue="get">
                <Select.Trigger radius="large" />
                <Select.Content>
                  <Select.Item value="get">GET</Select.Item>
                  <Select.Item value="put">PUT</Select.Item>
                  <Select.Item value="delete">DELETE</Select.Item>
                  <Select.Item value="patch">PATCH</Select.Item>
                  <Select.Item value="post">POST</Select.Item>
                </Select.Content>
              </Select.Root>
              <TextField.Root
                placeholder="/api/users"
                className={'w-full'}
                radius="large"
              ></TextField.Root>
            </Flex>
            <Flex>
              <Text size={'2'}>Headers</Text>
            </Flex>
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
            <Card>
              <Flex direction={'column'} gap={'4'}>
                <Flex justify={'between'} align={'center'}>
                  <Text size={'2'}>Add assertions</Text>
                  <Button radius="large" size={'1'}>
                    <Save /> Save
                  </Button>
                </Flex>
                <Flex gap={'2'} direction={{ md: 'row', initial: 'column' }}>
                  <Select.Root defaultValue="code">
                    <Select.Trigger radius="large" />
                    <Select.Content>
                      <Select.Item value="code">Status Code</Select.Item>
                      <Select.Item value="header">Response Header</Select.Item>
                      <Select.Item value="body">Response Body</Select.Item>
                      <Select.Item value="time">Response Time</Select.Item>
                    </Select.Content>
                  </Select.Root>
                  <TextField.Root
                    radius="large"
                    className={'w-full'}
                    placeholder={'field path'}
                  ></TextField.Root>
                  <Select.Root defaultValue="equal">
                    <Select.Trigger radius="large" />
                    <Select.Content>
                      <Select.Item value="equal">Equal</Select.Item>
                      <Select.Item value="contains">Contains</Select.Item>
                      <Select.Item value="greater">Greater Than</Select.Item>
                      <Select.Item value="less">Less Than</Select.Item>
                    </Select.Content>
                  </Select.Root>
                  <TextField.Root
                    radius="large"
                    className={'w-full'}
                    placeholder={'Expected value'}
                  ></TextField.Root>
                </Flex>
              </Flex>
            </Card>
          </Flex>
        </Card>
      </Flex>
    </Box>
  )
}

export default CreateTests
