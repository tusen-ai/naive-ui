import { c, cE, cM, cTB, cNotM } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const {
      railColor,
      railColorActive,
      buttonBoxShadow,
      buttonColor,
      buttonSize,
      buttonSizePressed
    } = props.$local
    const {
      cubicBezierEaseInOut
    } = props.$base
    return cTB('switch', {
      raw: `
        vertical-align: middle;
        user-select: none;
        display: inline-block;
        outline: none;
      `
    }, [
      cE('rail', {
        raw: `
          cursor: pointer;
          position: relative;
          height: 22px;
          width: 40px;
          border-radius: 11px;
          transition: background-color .3s ${cubicBezierEaseInOut};
          background-color: ${railColor};
        `
      }, [
        c('&::before', {
          raw: `
            background-color: ${buttonColor};
            box-sizing: border-box;
            cursor: inherit;
            content: "";
            position: absolute;
            height: ${buttonSize};
            width: ${buttonSizePressed};
            max-width: ${buttonSize};
            border-radius: 10px;
            top: 2px;
            left: 2px;
            transition:
              background-color .3s ${cubicBezierEaseInOut},
              left .3s ${cubicBezierEaseInOut},
              opacity .3s ${cubicBezierEaseInOut},
              max-width .3s ${cubicBezierEaseInOut},
              box-shadow .3s ${cubicBezierEaseInOut};
          `
        }),
        cNotM('disabled', [
          c('&:active::before', {
            maxWidth: buttonSizePressed
          }),
          cM('active', [
            c('&:active::before', {
              left: `calc(100% - 2px - ${buttonSizePressed})`
            })
          ])
        ]),
        cM('active', [
          c('&::before', {
            left: `calc(100% - 2px - ${buttonSize})`
          })
        ]),
        c('&::before', {
          boxShadow: buttonBoxShadow
        }),
        cM('active', {
          backgroundColor: railColorActive
        }),
        cM('disabled', {
          raw: `
            cursor: not-allowed;
            opacity: .5;
          `
        })
      ])
    ])
  }
])
