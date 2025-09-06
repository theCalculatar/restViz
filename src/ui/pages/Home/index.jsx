import { Checkbox } from 'radix-ui'
import { CheckIcon } from '@radix-ui/react-icons'

export function Home() {
  return (
    <div className="home">
      This is home page
      <Checkbox.Root className="CheckboxRoot" defaultChecked id="c1">
        <Checkbox.Indicator className="CheckboxIndicator">
          <CheckIcon />
        </Checkbox.Indicator>
      </Checkbox.Root>
    </div>
  )
}
