import { c, cTB, cM } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const { easeInOutCubicBezier } = props.$base
    const {
      blockqoutePrefixColor,
      blockquoteTextColor
    } = props.$local
    return cTB('blockquote', {
      raw: `
        line-height: 1.75;
        margin: 0;
        margin-top: 12px;
        margin-bottom: 12px;
        box-sizing: border-box;
        paddingLeft: 12px;
        transition:
          color .3s ${easeInOutCubicBezier},
          border-color .3s ${easeInOutCubicBezier};
      `,
      borderLeft: `4px solid ${blockqoutePrefixColor}`,
      color: blockquoteTextColor
    }, [
      c('&:first-child', {
        marginTop: 0
      }),
      c('&:last-child', {
        marginBottom: 0
      }),
      cM('align-text', {
        marginLeft: '-16px'
      })
    ])
  }
])
