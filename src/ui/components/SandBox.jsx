import { Box, Card, Flex, Text } from '@radix-ui/themes'
import { Play } from 'lucide-react'

function SandBox() {
  return (
    <Card className={'w-full'}>
      <Box>
        <Flex>
          <Play></Play>
          <Text className={'capitalize'}>Try it out</Text>
        </Flex>
        <Text size={'2'} color="gray">
          Test this endpoint with custom parameters and request body.
        </Text>
      </Box>
      {/* //todo continue... */}
    </Card>
  )
}

export default SandBox
