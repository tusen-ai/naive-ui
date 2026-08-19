import { keysOf } from '../../_utils'
import { cardBaseProps } from '../../card/src/Card'
import { dialogProps } from '../../dialog/src/dialogProps'

const presetProps = {
  ...cardBaseProps,
  // put dialog props after since I want the card to unbordered by default
  ...dialogProps
}

const presetPropsKeys = keysOf(presetProps)

// Modal forwards its own wrapped onClose/onPositiveClick/onNegativeClick to ModalBody explicitly, so exclude them here to avoid merging them into an array.
const forwardedPresetPropsKeys = presetPropsKeys.filter(
  key =>
    key !== 'onClose' && key !== 'onPositiveClick' && key !== 'onNegativeClick'
)

export { forwardedPresetPropsKeys, presetProps, presetPropsKeys }
