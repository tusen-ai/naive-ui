import { cTB, c } from '../../../../_utils/cssr'
import fadeInTransition from '../../../../styles/_transitions/fade-in'

export default c([
  ({ props }) => {
    const {
      color,
      textColor
    } = props.$local
    return cTB('base-menu-mask', {
      raw: `
        font-size: 14px;
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
        color: ${textColor};
        background-color: ${color};
      `
    }, [
      fadeInTransition()
    ])
  }
])
