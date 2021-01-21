import { dialogProps } from '../../dialog'
import type { DialogProps } from '../../dialog'
import { cardProps } from '../../card'
import type { CardProps } from '../../card'
import { keysOf } from '../../_utils'

const presetProps: DialogProps & CardProps = {
  ...cardProps,
  // put dialog props after since I want the card to unbordered by default
  ...dialogProps
}

const presetPropsKeys = keysOf(presetProps)

export { presetProps, presetPropsKeys }
