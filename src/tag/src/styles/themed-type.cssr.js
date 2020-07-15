import { c, cE, cM, cTB, cNotM } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const type = props.$instance.type
    const pallete = props.$local[type]
    const {
      borderColor,
      textColor,
      backgroundColor,
      closeColor,
      closeHoverColor,
      closeActiveColor
    } = pallete
    return cTB('tag', [
      cNotM('checkable', [
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
            ])
          ])
        ])
      ])
    ])
  }
])
