import { Box, Button, Flex, TextField } from '@radix-ui/themes'
import { act_addSuit, act_dismissDialog } from '../context/actions'
import { useContext, useState } from 'preact/hooks'
import { AppContext } from '../context'

function CreateSuite() {
  const { setDialog, setSuite } = useContext(AppContext)
  const [suitName, setSuitName] = useState('')
  const [suitDescription, setSuitDescription] = useState('')

  const saveDialog = () => {
    setSuite({
      type: act_addSuit,
      payload: { title: suitName, description: suitDescription },
    })
    setDialog({ type: act_dismissDialog })
  }

  return (
    <Box mt={'4'}>
      <Flex direction={'column'} gap={'2'}>
        <Flex direction={'column'}>
          <label className={'text-sm mb-1'} for={'name'}>
            Suit name*
          </label>
          <TextField.Root
            id={'name'}
            placeholder="e.g User API Test"
            onChange={(e) => {
              // @ts-ignore
              setSuitName(e.target.value.trim())
            }}
          />
        </Flex>
        <Flex direction={'column'}>
          <label className={'text-sm mb-1'} for={'description'}>
            Description
          </label>
          <TextField.Root
            id={'description'}
            placeholder="Describe the pursose of this test suits..."
            onChange={(e) => {
              // @ts-ignore
              setSuitDescription(e.target.value.trim())
            }}
          />
        </Flex>
      </Flex>
      <Flex justify={'end'} mt={'4'} gap={'2'}>
        <Button
          radius="medium"
          variant="outline"
          onClick={() => {
            setDialog({ type: act_dismissDialog })
          }}
        >
          Cancel
        </Button>
        <Button radius="medium" disabled={suitName === ''} onClick={saveDialog}>
          Create Suite
        </Button>
      </Flex>
    </Box>
  )
}

export default CreateSuite
