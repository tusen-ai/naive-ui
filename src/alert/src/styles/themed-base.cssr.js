import { c, cTB, cB, cE, cM } from '../../../_utils/cssr'
import fadeInHeightExpandTranstion from '../../../styles/_transitions/fade-in-height-expand'

export default c([
  ({ props }) => {
    const { easeInOutCubicBezier } = props.$base
    const { borderRadius, titleFontWeight } = props.$local
    return cTB('alert', {
      lineHeight: 1.75,
      borderRadius,
      position: 'relative',
      transition: `
        background-color .3s ${easeInOutCubicBezier},
      `
    }, [
      fadeInHeightExpandTranstion({
        originalTransition: `transform .3s ${easeInOutCubicBezier}`,
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
          top: 14px;
          width: 19px;
          height: 19px;
        `
      }, [
        cB('icon', {
          raw: `
            cursor: pointer;
            font-size: 19px;
          `
        })
      ]),
      cB('alert-body', {
        padding: '15px 15px 15px 47px',
        transition: `border-color .3s ${easeInOutCubicBezier}`
      }, [
        cE('title', {
          transition: `color .3s ${easeInOutCubicBezier}`,
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
          transition: `color .3s ${easeInOutCubicBezier}`,
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
