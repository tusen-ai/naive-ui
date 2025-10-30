import { fadeInHeightExpandTransition } from '../../../_styles/transitions/fade-in-height-expand.cssr'
import { cB } from '../../../_utils/cssr'

export default cB('collapse-transition', {
  width: '100%'
}, [
  fadeInHeightExpandTransition()
])
