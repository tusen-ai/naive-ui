import { c, cTB, cB, cM } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const {
      cubicBezierEaseInOut
    } = props.$base
    const {
      liTextColor
    } = props.$local
    return [
      cTB('ol', {
        paddingLeft: '1.75em'
      }, [
        cM('align-text', {
          paddingLeft: 0
        }),
        cB('li', {
          color: liTextColor
        })
      ]),
      cTB('ul', {
        paddingLeft: '1.75em'
      }, [
        cM('align-text', {
          paddingLeft: 0
        }),
        cB('li', {
          color: liTextColor
        })
      ]),
      cB('li', {
        transition: `color .3s ${cubicBezierEaseInOut}`,
        lineHeight: '1.75em',
        marginBottom: 0,
        fontSize: '14px'
      })
    ]
  }
])
