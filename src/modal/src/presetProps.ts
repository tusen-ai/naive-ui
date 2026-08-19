import { keysOf } from '../../_utils'
import { cardBaseProps } from '../../card/src/Card'
import { dialogProps } from '../../dialog/src/dialogProps'

const presetProps = {
  ...cardBaseProps,
  // put dialog props after since I want the card to unbordered by default
  ...dialogProps
}

const presetPropsKeys = keysOf(presetProps)

// Modal explicitly passes its own wrapped onClose/onPositiveClick/onNegativeClick
// to NModalBodyWrapper, so exclude them here — otherwise Vue merges each pair into
// an array and BodyWrapper's direct `props.onPositiveClick()` call breaks.
const forwardedPresetPropsKeys = presetPropsKeys.filter(
  key =>
    key !== 'onClose' && key !== 'onPositiveClick' && key !== 'onNegativeClick'
)

export { forwardedPresetPropsKeys, presetProps, presetPropsKeys }
