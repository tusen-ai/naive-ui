import { cB } from '../../../../_utils/cssr'
import { fadeInTransition } from '../../../../_styles/transitions/fade-in.cssr'

export default cB('base-menu-mask', `
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 14px;
  overflow: hidden;
`, [
  fadeInTransition()
])
