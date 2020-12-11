import { cTB, c, cM, createKey } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const {
      $global: {
        cubicBezierEaseInOut
      },
      $local: {
        borderRadius,
        color: backgroundColor,
        textColor,
        boxShadow
      }
    } = props
    return cTB('input-group-label', {
      userSelect: 'none',
      boxSizing: 'border-box',
      padding: '0 12px',
      display: 'inline-block',
      borderRadius,
      backgroundColor,
      color: textColor,
      boxShadow,
      transition: `
        color .3s ${cubicBezierEaseInOut},
        background-color .3s ${cubicBezierEaseInOut},
        box-shadow .3s ${cubicBezierEaseInOut}
      `
    }, ['small', 'medium', 'large'].map(size => {
      const {
        $local: {
          [createKey('fontSize', size)]: fontSize,
          [createKey('height', size)]: height
        }
      } = props
      return cM(size + '-size', {
        fontSize,
        lineHeight: height,
        height
      })
    }))
  }
])
