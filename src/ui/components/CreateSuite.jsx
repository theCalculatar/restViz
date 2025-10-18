import { Box, Button, Flex, TextField } from '@radix-ui/themes'
import {
  act_addSuit,
  act_dismissDialog,
  act_updateSuit,
} from '../context/actions'
import { useContext, useEffect, useState } from 'preact/hooks'
import { AppContext } from '../context'

function CreateSuite(id) {
  const { setDialog, suites, setSuite } = useContext(AppContext)
  const [suitName, setSuitName] = useState('')
  const [suitDescription, setSuitDescription] = useState('')

  useEffect(() => {
    if (JSON.stringify(id) === '{}') return

    const suite = suites.find((suite) => suite.id === id)

    setSuitName(suite?.title)
    setSuitDescription(suite?.description)
  }, [])

  const saveDialog = () => {
    setSuite({
      type: JSON.stringify(id) !== '{}' ? act_updateSuit : act_addSuit,
      payload: { id, title: suitName, description: suitDescription },
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
            value={suitName}
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
            value={suitDescription}
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
