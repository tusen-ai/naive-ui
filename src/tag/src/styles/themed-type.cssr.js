import { c, cE, cM, cTB, cNotM } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const type = props.$instance.type
    const pallete = props.$local[type]
    const {
      borderColor,
      textColor,
      color,
      closeColor,
      closeColorHover,
      closeColorActive
    } = pallete
    return cTB('tag', [
      cNotM('checkable', [
        cM(`${type}-type`, {
          boxShadow: `inset 0 0 0 1px ${borderColor}`,
          color: textColor,
          backgroundColor: color
        }, [
          cE('close', {
            fill: closeColor
          }),
          cNotM('disabled', [
            cE('close', [
              c('&:hover', {
                fill: closeColorHover
              }),
              c('&:active', {
                fill: closeColorActive
              })
            ])
          ])
        ])
      ])
    ])
  }
])
