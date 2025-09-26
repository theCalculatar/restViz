import React, { useContext, useEffect } from 'preact/compat'
import {
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Text,
  TabNav,
  Tabs,
} from '@radix-ui/themes'
import { Copy } from 'lucide-react'
import { AppContext } from '../context'

//all logic and UI here
export default function RouteDescrption() {
  const { activeRoute } = useContext(AppContext)

  useEffect(() => {
    console.log(activeRoute)
  })

  return (
    <Box width={'100%'}>
      <Box>
        <Flex justify={'between'} align={'center'} mb={'2'}>
          <Flex gap={'2'} align={'center'}>
            <Badge color="green" size={'3'}>
              Get
            </Badge>
            <Badge color="gray" size={'3'}>
              {activeRoute.path}
            </Badge>
          </Flex>
          <Button variant={'outline'} color="gray" radius="large" size={'2'}>
            <Copy></Copy> Copy
          </Button>
        </Flex>
        <Text size={'2'} color="gray">
          {activeRoute.description}
        </Text>
      </Box>
      {/* Other info here */}
      <Box p={'3'}></Box>

      <Tabs.Root defaultValue="description">
        <Tabs.List
          justify={'center'}
          color="gray"
          style={{ display: 'flex', gap: '14px' }}
        >
          <Tabs.Trigger value="description">Description</Tabs.Trigger>
          <Tabs.Trigger value="notes">Notes</Tabs.Trigger>
          <Tabs.Trigger value="request">Request</Tabs.Trigger>
          <Tabs.Trigger value="responses">Responses</Tabs.Trigger>
        </Tabs.List>

        <Box pt="3">
          <Tabs.Content value="description">
            <Card asChild>
              <a href="#">
                <Text as="div" size="2" weight="bold">
                  Descriptions{' '}
                </Text>
                <Text as="div" color="gray" size="2">
                  {activeRoute.description || 'No description available'}{' '}
                </Text>
              </a>
            </Card>
          </Tabs.Content>

          <Tabs.Content value="notes">
            <Card asChild>
              <a href="#">
                <Text as="div" size="2" weight="bold">
                  Notes{' '}
                </Text>
                <Text as="div" color="gray" size="2">
                  {activeRoute.notes || 'No notes added yet'}{' '}
                </Text>
              </a>
            </Card>
          </Tabs.Content>

          <Tabs.Content value="request">
            <Card asChild>
              <a href="#">
                <Text as="div" size="2" weight="bold">
                  Requests{' '}
                </Text>
                <Text as="div" color="gray" size="2">
                  {activeRoute.requestBody || 'No request body'}{' '}
                </Text>
              </a>
            </Card>
          </Tabs.Content>

          <Tabs.Content value="responses">
            <Card asChild>
              <a href="#">
                <Text as="div" size="2" weight="bold">
                  Responses{' '}
                </Text>
                <Text as="div" color="gray" size="2">
                  {activeRoute.responses || 'No responses defined'}{' '}
                </Text>
              </a>
            </Card>
          </Tabs.Content>
        </Box>
      </Tabs.Root>
    </Box>
  )
}
