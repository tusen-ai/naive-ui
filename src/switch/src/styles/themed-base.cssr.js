import { c, cE, cM, cTB, cNotM } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const {
      railColor,
      railColorActive,
      buttonBackgroundImage,
      buttonBackgroundImageActive,
      buttonBackgroundPosition,
      buttonBoxShadow
    } = props.$local
    const {
      easeInOutCubicBezier
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
          height: 14px;
          width: 30px;
          border-radius: 7px;
          margin: 3px;
          transition: background-color .3s ${easeInOutCubicBezier};
          background-color: ${railColor};
        `
      }, [
        c('&::before, &::after', {
          raw: `
            box-sizing: border-box;
            cursor: inherit;
            content: "";
            position: absolute;
            height: 20px;
            width: 24px;
            max-width: 20px;
            border-radius: 10px;
            top: -3px;
            left: -3px;
            background-size: 800% 800%;
            transition:
              left .3s ${easeInOutCubicBezier},
              opacity .3s ${easeInOutCubicBezier},
              max-width .3s ${easeInOutCubicBezier},
              background-position .3s ${easeInOutCubicBezier},
              box-shadow .3s ${easeInOutCubicBezier};
          `
        }),
        c('&::before', {
          raw: `
            opacity: 1;
          `
        }),
        c('&::after', {
          raw: `
            opacity: 0;
          `
        }),
        cNotM('disabled', [
          c('&:active::before, &:active::after', {
            raw: `
              max-width: 24px;
            `
          }),
          cM('active', [
            c('&:active::before, &:active::after', {
              raw: `
                left: 9px;
              `
            })
          ])
        ]),
        cM('active', [
          c('&::before', {
            raw: `
              left: 13px;
              opacity: 1;
            `
          }),
          c('&::after', {
            raw: `
              left: 13px;
              opacity: 1;
            `
          })
        ]),
        c('&::before', {
          raw: `
            box-shadow: ${buttonBoxShadow};
            background-position: ${buttonBackgroundPosition};
            background-image: ${buttonBackgroundImage};
          `
        }),
        c('&::after', {
          raw: `
            background-position: ${buttonBackgroundPosition};
            background-image: ${buttonBackgroundImageActive};
          `
        }),
        cM('active', {
          raw: `
            background-color: ${railColorActive};
          `
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
