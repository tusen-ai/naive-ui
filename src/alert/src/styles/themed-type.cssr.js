import { c, cTB, cB, cE, cM } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const type = props.$instance.type
    const pallete = props.$local[type]
    const {
      backgroundColor,
      borderColor,
      iconColor,
      titleTextColor,
      contentTextColor,
      closeColor,
      closeHoverColor,
      closeActiveColor
    } = pallete
    return cTB('alert', [
      cM(type + '-type', {
        backgroundColor,
        border: `1px solid ${borderColor}`,
        textAlign: 'start'
      }, [
        cE('close', [
          cB('icon', {
            fill: closeColor,
            stroke: closeColor
          }),
          c('&:hover', [
            cB('icon', {
              fill: closeHoverColor,
              stroke: closeHoverColor
            })
          ]),
          c('&:active', [
            cB('icon', {
              fill: closeActiveColor,
              stroke: closeActiveColor
            })
          ])
        ]),
        cE('icon', [
          cB('icon', {
            fill: iconColor,
            stroke: iconColor
          })
        ]),
        cB('alert-body', [
          cE('title', {
            color: titleTextColor
          }),
          cE('content', {
            color: contentTextColor
          })
        ])
      ])
    ])
  }
])
