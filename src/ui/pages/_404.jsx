import {
  Callout,
  Card,
  Code,
  Flex,
  Separator,
  Text,
} from '@radix-ui/themes'
import { BookOpenIcon, Dot, Search } from 'lucide-react'

export function NotFound() {
  return (
    <section className={'h-full px-2'}>
      <Flex className={'h-full items-center justify-center lg:-mt-24'}>
        <Card className={'h-min mx-auto shadow-sm'} size={'2'}>
          <Flex direction={'column'} gap={'4'} className={'max-w-lg'}>
            <Flex gap={'2'} justify={'center'}>
              <Code size={'4'} variant="soft">
                404
              </Code>
              <Dot />
              <Code variant="soft" size={'4'} color="red">
                Not Found
              </Code>
            </Flex>
            <Flex>
              <Text
                size={'6'}
                align={'center'}
                weight={'bold'}
                className={'mx-auto'}
              >
                Endpoint Not Found
              </Text>
            </Flex>
            <Flex direction={'column'} gap={'4'} align={'center'}>
              <Text>What you can do:</Text>
              <Flex gap={'4'}>
                <Callout.Root
                  className={'flex-1'}
                  variant="outline"
                  color="gray"
                >
                  <Callout.Icon>
                    <Search className={'text-blue-500'} />
                  </Callout.Icon>
                  <Callout.Text>
                    <Flex direction={'column'}>
                      <Text weight={'bold'}>Check the URL</Text>
                      <Text color="gray" size={'2'}>
                        Verify the endpoint path and parameters
                      </Text>
                    </Flex>
                  </Callout.Text>
                </Callout.Root>
                <Callout.Root
                  className={'flex-1'}
                  variant="outline"
                  color="gray"
                >
                  <Callout.Icon>
                    <BookOpenIcon className={'text-green-500'} />
                  </Callout.Icon>
                  <Callout.Text>
                    <Flex direction={'column'}>
                      <Text weight={'bold'} color="gray">
                        Browse Documentation
                      </Text>
                      <Text size={'2'}>Explore available API endpoints</Text>
                    </Flex>
                  </Callout.Text>
                </Callout.Root>
              </Flex>
            </Flex>
            <Separator size={'4'} />
            <Text align={'center'} size={'2'}>
              Pro tip: Use the sidebar to explore available endpoints, or try
              the search functionality to find what you're looking for.
            </Text>
          </Flex>
        </Card>
      </Flex>
    </section>
  )
}
