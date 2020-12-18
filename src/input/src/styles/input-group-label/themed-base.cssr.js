import { cTB, c, cM, cE, createKey } from '../../../../_utils/cssr'

export default c([
  ({ props }) => {
    const {
      $global: {
        cubicBezierEaseInOut
      },
      $local: {
        borderRadius,
        groupLabelColor,
        textColor,
        boxShadow,
        border
      }
    } = props
    return cTB('input-group-label', {
      position: 'relative',
      userSelect: 'none',
      boxSizing: 'border-box',
      padding: '0 12px',
      display: 'inline-block',
      borderRadius,
      backgroundColor: groupLabelColor,
      color: textColor,
      boxShadow,
      transition: `
        color .3s ${cubicBezierEaseInOut},
        background-color .3s ${cubicBezierEaseInOut},
        box-shadow .3s ${cubicBezierEaseInOut}
      `
    }, [
      ['small', 'medium', 'large'].map(size => {
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
      }),
      cE('border', {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        borderRadius: 'inherit',
        border,
        transition: `border-color .3s ${cubicBezierEaseInOut}`
      })
    ])
  }
])
