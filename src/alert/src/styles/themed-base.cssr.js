import { c, cTB, cB, cE, cM } from '../../../_utils/cssr'
import fadeInHeightExpandTranstion from '../../../_styles/transitions/fade-in-height-expand'

export default c([
  ({ props }) => {
    const { cubicBezierEaseInOut } = props.$base
    const { borderRadius, titleFontWeight } = props.$local
    return cTB('alert', {
      lineHeight: 1.75,
      borderRadius,
      position: 'relative',
      transition: `
        background-color .3s ${cubicBezierEaseInOut}
      `
    }, [
      fadeInHeightExpandTranstion({
        originalTransition: `transform .3s ${cubicBezierEaseInOut}`,
        enterToProps: {
          transform: 'scale(1)'
        },
        leaveToProps: {
          transform: 'scale(0.9)'
        }
      }),
      cE('icon', {
        raw: `
          position: absolute;
          left: 12px;
          top: 14px;
          align-items: center;
          justify-content: center;
          width: 26px;
          height: 26px;
        `
      }, [
        cB('icon', {
          fontSize: '26px'
        })
      ]),
      cE('close', {
        raw: `
          position: absolute;
          right: 16px;
          font-size: 14px;
          top: 14px;
          width: 1em;
          height: 1em;
          line-height: 0;
        `
      }, [
        cB('icon', {
          raw: `
            cursor: pointer;
          `
        })
      ]),
      cB('alert-body', {
        borderRadius,
        padding: '15px 15px 15px 47px',
        transition: `border-color .3s ${cubicBezierEaseInOut}`
      }, [
        cE('title', {
          transition: `color .3s ${cubicBezierEaseInOut}`,
          fontSize: '16px',
          lineHeight: '19px',
          fontWeight: titleFontWeight
        }, [
          c('& +', [
            cE('content', {
              marginTop: '9px'
            })
          ])
        ]),
        cE('content', {
          transition: `color .3s ${cubicBezierEaseInOut}`,
          fontSize: '14px'
        })
      ]),
      cM('no-icon', [
        cB('alert-body', {
          paddingLeft: '19px'
        })
      ])
    ])
  }
])
