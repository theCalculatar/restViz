import { useContext, useEffect, useState } from 'preact/hooks'
import { AppContext } from '../context'
import { Box, Card, Flex, Text, TextField, ScrollArea } from '@radix-ui/themes'
import { CommandIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { act_setConfigtTheme } from '../context/actions'

interface CommandItem {
  name: string
  action: () => void
}

export const Command = () => {
  const { routes, setConfig } = useContext(AppContext)
  const navigate = useNavigate()
  const [results, setResults] = useState<CommandItem[]>([])
  const [commandOpen, setCommandOpen] = useState(false)

  const commands: CommandItem[] = [
    {
      name: 'Toggle Dark Mode',
      action: () => setConfig({ type: act_setConfigtTheme }),
    },
    {
      name: 'Copy Base URL',
      action: () => navigator.clipboard.writeText('http://localhost:3000'),
    },
    {
      name: 'Open Documentation',
      action: () => window.open('https://restviz.com/docs', '_blank'),
    },
    {
      name: 'Open GitHub Issues',
      action: () => navigate('https:github.com/theCalculatar/restviz/issues'),
    },
    {
      name: 'Go to Settings',
      action: () => navigate('/settings'),
    },
  ]

  commands.push(
    ...routes.map((route: any) => ({
      name: `Go to ${route.path}-${route.method} endpoint`,
      action: () => navigate('/test' + route.path),
    }))
  )

  useEffect(() => {
    setResults(commands)
  }, [routes])

  const inputChange = (e: any) => {
    setCommandOpen(true)
    const value = e.target.value.toLowerCase()
    const matchedCommand = commands.filter((cmd) =>
      cmd.name.toLowerCase().includes(value)
    )
    setResults(matchedCommand)
  }

  return (
    <Flex width={'400px'} className={'relative'} align={'center'}>
      <TextField.Root
        className={'w-full'}
        radius="large"
        placeholder={'Type a command or search...'}
        autoComplete="off"
        onChange={(e) => inputChange(e)}
        onFocus={() => {
          setCommandOpen(true)
        }}
        onFocusOut={() => {
          setTimeout(() => {
            setCommandOpen(false)
          }, 200)
        }}
      >
        <TextField.Slot>
          <CommandIcon />
        </TextField.Slot>
      </TextField.Root>
      {commandOpen && (
        <Box className={'absolute inset-x-0 top-10 w-[400px] max-h-10 z-10'}>
          <Card variant="surface">
            <ScrollArea
              type="scroll"
              scrollbars="vertical"
              size={'1'}
              className={'max-h-60'}
            >
              {results.length !== 0
                ? results.map((cmd) => (
                    <Box
                      key={cmd.name}
                      className={
                        'p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer'
                      }
                      onClick={cmd.action}
                    >
                      <Text>{cmd.name}</Text>
                    </Box>
                  ))
                : 'No commands found...'}
            </ScrollArea>
          </Card>
        </Box>
      )}
    </Flex>
  )
}
