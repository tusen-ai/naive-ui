import { cB } from '../../../_utils/cssr'
import { fadeInHeightExpandTransition } from '../../../_styles/transitions/fade-in-height-expand.cssr'

export default cB('collapse-transition', {
  width: '100%'
}, [
  fadeInHeightExpandTransition()
])
