import { Box, Card, Flex, IconButton, ScrollArea, Text } from '@radix-ui/themes'
import { X } from 'lucide-react'
import { useContext } from 'preact/hooks'
import { AppContext } from '../context'
import { Fragment } from 'preact/jsx-runtime'
import { act_dismissDialog } from '../context/actions'

function Dialog() {
  const { Frag, setDialog } = useContext(AppContext)

  return (
    <Fragment>
      {Frag && (
        <Box className={'h-screen w-screen fixed inset-0 z-50'}>
          <Box
            className={
              'bg-black/5 z-40 backdrop-blur-sm h-screen w-screen fixed inset-0'
            }
            onClick={() => {
              setDialog({ type: act_dismissDialog })
            }}
          ></Box>
          <ScrollArea type="scroll" scrollbars="vertical" size={'1'}>
            <Flex
              className={'min-h-full overflow-auto'}
              align={'center'}
              justify={'center'}
            >
              <Card
                className={
                  'min-w-80 my-5 mx-4 z-50 bg-white shadow-lg dark:bg-neutral-900 transition-all ease-out '
                }
                variant="surface"
                size={'2'}
              >
                <Flex gap={'4'} justify={'between'} className={'select-none'}>
                  <Flex direction={'column'}>
                    <Text size={'4'} weight={'bold'}>
                      {Frag.title}
                    </Text>
                    <Text size={'2'} color="gray">
                      {Frag.description}
                    </Text>
                  </Flex>
                  <IconButton
                    radius="full"
                    variant="soft"
                    onClick={() => {
                      setDialog({ type: act_dismissDialog })
                    }}
                  >
                    <X />
                  </IconButton>
                </Flex>
                <Box>
                  <Frag.Root />
                </Box>
              </Card>
            </Flex>
          </ScrollArea>
        </Box>
      )}
    </Fragment>
  )
}

export default Dialog
