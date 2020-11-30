import { cTB, c, cB, cM } from '../../../../_utils/cssr'

export default c([
  ({ props }) => {
    const {
      textColor,
      color
    } = props.$local
    const {
      cubicBezierEaseInOut
    } = props.$global
    return [
      cTB('layout', {
        raw: `
        color: ${textColor};
        background-color: ${color};
        box-sizing: border-box;
        position: relative;
        z-index: auto;
        transition:
          margin-left .3s ${cubicBezierEaseInOut},
          background-color .3s ${cubicBezierEaseInOut},
          color .3s ${cubicBezierEaseInOut};
        flex: auto;
        overflow-x: hidden;
      `
      }, [
        cM('has-sider', {
          raw: `
            display: flex;
            flex-wrap: nowrap;
            width: 100%;
            flex-direction: row;
          `
        }),
        cM('absolute-positioned', {
          raw: `
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
          `
        }, [
          cB('layout-sider', {
            raw: `
              z-index: 1;
            `
          })
        ])
      ]),
      cTB('layout-content', {
        raw: `
          transition:
            margin-left .3s ${cubicBezierEaseInOut},
            background-color .3s ${cubicBezierEaseInOut},
            color .3s ${cubicBezierEaseInOut};
          box-sizing: border-box;
          position: relative;
          z-index: auto;
        `
      })
    ]
  }
])
