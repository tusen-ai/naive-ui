import { c, cTB, cM } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const {
      $global: { cubicBezierEaseInOut },
      $local: {
        blockquoteFontSize,
        blockquotePrefixColor,
        blockquoteTextColor,
        blockquoteLineHeight
      }
    } = props
    return cTB('blockquote', {
      raw: `
        font-size: ${blockquoteFontSize};
        line-height: ${blockquoteLineHeight};
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
