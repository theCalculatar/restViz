import { Badge, Box, Button, Card, Flex, Text } from '@radix-ui/themes'
import { Copy } from 'lucide-react'

//all logic and UI here
export default function RouteDescrption() {
  return (
    <Box width={'100%'}>
      <Box>
        <Flex justify={'between'} align={'center'} mb={'2'}>
          <Flex gap={'2'} align={'center'}>
            <Badge color="green" size={'3'}>
              Get
            </Badge>
            <Badge color="gray" size={'3'}>
              /users
            </Badge>
          </Flex>
          <Button variant={'outline'} color="gray" radius="large" size={'2'}>
            <Copy></Copy> Copy
          </Button>
        </Flex>
        <Text size={'2'} color="gray">
          Route Description
        </Text>
      </Box>
      {/* Other info here */}
      <Box p={'3'}></Box>
    </Box>
  )
}
