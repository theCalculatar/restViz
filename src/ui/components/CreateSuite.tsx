import { Box, Button, Flex, TextField } from '@radix-ui/themes'
import {
  act_addSuit,
  act_dismissDialog,
  act_updateSuit,
} from '../context/actions'
import { useContext, useEffect, useState } from 'preact/hooks'
import { AppContext } from '../context'

function CreateSuite(props: any) {
  const { setDialog, suites, setSuite } = useContext(AppContext)
  const [suitName, setSuitName] = useState('')
  const [suitDescription, setSuitDescription] = useState('')

  const id = typeof props === 'string' ? props : props?.id
  const isEdit = typeof id === 'string' && id !== ''

  useEffect(() => {
    if (!isEdit) return

    const suite = suites.find((suite: any) => suite.id === id)

    if (suite) {
      setSuitName(suite.title || '')
      setSuitDescription(suite.description || '')
    }
  }, [id, isEdit, suites])

  const saveDialog = () => {
    setSuite({
      type: isEdit ? act_updateSuit : act_addSuit,
      payload: { id, title: suitName, description: suitDescription },
    })
    setDialog({ type: act_dismissDialog })
  }

  return (
    <Box mt={'4'}>
      <Flex direction={'column'} gap={'2'}>
        <Flex direction={'column'}>
          <label className={'text-sm mb-1'} htmlFor={'name'}>
            Suit name*
          </label>
          <TextField.Root
            id={'name'}
            placeholder="e.g User API Test"
            value={suitName}
            onChange={(e: any) => {
              setSuitName(e.target.value)
            }}
          />
        </Flex>
        <Flex direction={'column'}>
          <label className={'text-sm mb-1'} htmlFor={'description'}>
            Description
          </label>
          <TextField.Root
            id={'description'}
            placeholder="Describe the pursose of this test suits..."
            value={suitDescription}
            onChange={(e: any) => {
              setSuitDescription(e.target.value)
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
