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
        margin: '12px 0',
        paddingLeft: '1.75em'
      }, [
        c('&:first-child', {
          marginTop: 0
        }),
        c('&:last-child', {
          marginBottom: 0
        }),
        cM('align-text', {
          paddingLeft: 0
        }),
        cB('li', {
          color: liTextColor
        })
      ]),
      cTB('ul', {
        margin: '12px 0',
        paddingLeft: '1.75em'
      }, [
        c('&:first-child', {
          marginTop: 0
        }),
        c('&:last-child', {
          marginBottom: 0
        }),
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
