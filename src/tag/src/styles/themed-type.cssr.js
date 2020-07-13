import { c, cE, cM, cTB, cNotM } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const {
      type
    } = props.$instance.type
    const pallete = props.$local[type]
    const {
      borderColor,
      textColor,
      backgroundColor,
      closeColor,
      closeHoverColor,
      closeActiveColor,
      hoverBackgroundColor,
      activeBackgroudColor,
      disabledBorderColor,
      disabledTextColor,
      disabledBackgroundColor,
      disabledCloseColor
    } = pallete
    return cTB('tag', [
      cM(`${type}-type`, {
        boxShadow: `inset 0 0 0 1px ${borderColor}`,
        color: textColor,
        backgroundColor: backgroundColor
      }, [
        cE('close', {
          fill: closeColor
        }),
        cNotM('disabled', [
          cE('close', [
            c('&:hover', {
              fill: closeHoverColor
            }),
            c('&:active', {
              fill: closeActiveColor
            })
          ]),
          c('&:hover', {
            backgroundColor: hoverBackgroundColor
          }),
          c('&:active', {
            backgroundColor: activeBackgroudColor
          })
        ]),
        cM('disabled', {
          boxShadow: `inset 0 0 0 1px ${disabledBorderColor}`,
          color: disabledTextColor,
          backgroundColor: disabledBackgroundColor
        }, [
          cE('close', {
            fill: disabledCloseColor
          })
        ])
      ])
    ])
  }
])
