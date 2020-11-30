import { c, cTB, cM } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const { cubicBezierEaseInOut } = props.$global
    const {
      blockquotePrefixColor,
      blockquoteTextColor
    } = props.$local
    return cTB('blockquote', {
      raw: `
        line-height: 1.75;
        margin: 0;
        margin-top: 12px;
        margin-bottom: 12px;
        box-sizing: border-box;
        padding-left: 12px;
        transition:
          color .3s ${cubicBezierEaseInOut},
          border-color .3s ${cubicBezierEaseInOut};
      `,
      borderLeft: `4px solid ${blockquotePrefixColor}`,
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
