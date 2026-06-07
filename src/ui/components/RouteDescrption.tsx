import {
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Text,
  Tabs,
  Code,
} from '@radix-ui/themes'
import { Check, Copy } from 'lucide-react'
import { prettyJson } from '../utils/json'
import { useState, Fragment } from 'react'

//all logic and UI here
export default function RouteDescrption({ route }: { route: any }) {
  const [bCopied, setBCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(route?.path || '')
    setBCopied(true)
    setTimeout(() => {
      setBCopied(false)
    }, 3000)
  }
  return (
    <Box width={'100%'}>
      <Box>
        <Flex justify={'between'} align={'center'} mb={'2'}>
          <Flex gap={'2'} align={'center'}>
            <Badge color="green" size={'3'}>
              {route?.method}
            </Badge>
            <Badge color="gray" size={'3'}>
              {route?.path}
            </Badge>
          </Flex>
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
        <Text size={'2'} color="gray">
          {route?.description || 'No description available'}
        </Text>
      </Box>
      {/* Other info here */}
      <Box mt={'3'}>
        <Tabs.Root defaultValue="description">
          <Flex>
            <Tabs.List color="gray">
              <Tabs.Trigger value="description">Description</Tabs.Trigger>
              <Tabs.Trigger value="notes">Notes</Tabs.Trigger>
              <Tabs.Trigger value="request">Responses</Tabs.Trigger>
            </Tabs.List>
          </Flex>

          <Box mt="3">
            <Tabs.Content value="description">
              <Card>
                <Text as="div" weight="bold" mb={'2'}>
                  Descriptions
                </Text>
                <Text as="div" color="gray" size="2">
                  {route?.description || 'No description available'}
                </Text>
              </Card>
            </Tabs.Content>

            <Tabs.Content value="notes">
              <Card>
                <Text as="p" weight="bold" mb={'2'}>
                  Notes & Warnings
                </Text>
                <Text as="p" color="gray" size="2">
                  {route?.notes || 'No notes added yet'}
                </Text>
              </Card>
            </Tabs.Content>

            <Tabs.Content value="request">
              <Card>
                <Text as="p" mb="2" weight="bold">
                  Responses
                </Text>

                <Text as="div" color="gray" size="2">
                  <pre>
                    {prettyJson(route?.responses, 'No response body defined')}
                  </pre>
                </Text>
              </Card>
            </Tabs.Content>
          </Box>
        </Tabs.Root>
      </Box>
    </Box>
  )
}
