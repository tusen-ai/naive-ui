import { cTB, c, cM } from '../../../../_utils/cssr'

export default c([
  ({ props }) => {
    const {
      headerColor,
      headerBorderColor,
      footerBorderColor
    } = props.$local
    const {
      easeInOutCubicBezier
    } = props.$base
    return [
      cTB('layout-header', {
        raw: `
          transition:
            background-color .3s ${easeInOutCubicBezier},
            box-shadow .3s ${easeInOutCubicBezier},
            border-color .3s ${easeInOutCubicBezier};
          box-sizing: border-box;
          width: 100%;
          background-color: ${headerColor};
        `
      }, [
        cM('bordered', {
          raw: `
            border-bottom: solid 1px ${headerBorderColor};
          `
        })
      ]),
      cTB('layout-footer', {
        raw: `
          transition:
            background-color .3s ${easeInOutCubicBezier},
            border-color .3s ${easeInOutCubicBezier};
          box-sizing: border-box;
        `
      }, [
        cM('absolute-positioned', {
          raw: `
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
          `
        }),
        cM('bordered', {
          raw: `
            border-top: solid 1px ${footerBorderColor};
          `
        })
      ])
    ]
  }
])
