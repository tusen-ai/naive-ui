import { dialogProps } from '../../dialog/src/dialogProps'
import { cardBaseProps } from '../../card/src/Card'
import { keysOf } from '../../_utils'

const presetProps = {
  ...cardBaseProps,
  // put dialog props after since I want the card to unbordered by default
  ...dialogProps
}

const presetPropsKeys = keysOf(presetProps)

export { presetProps, presetPropsKeys }
