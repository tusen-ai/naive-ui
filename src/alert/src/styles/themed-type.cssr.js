import { c, cTB, cB, cE, cM } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const type = props.$instance.type
    const pallete = props.$local[type]
    const {
      color: backgroundColor,
      borderColor,
      iconColor,
      titleTextColor,
      contentTextColor,
      closeColor,
      closeColorHover,
      closeColorActive
    } = pallete
    return cTB('alert', [
      cM(type + '-type', {
        backgroundColor,
        textAlign: 'start'
      }, [
        cE('close', [
          cB('icon', {
            fill: closeColor,
            stroke: closeColor
          }),
          c('&:hover', [
            cB('icon', {
              fill: closeColorHover,
              stroke: closeColorHover
            })
          ]),
          c('&:active', [
            cB('icon', {
              fill: closeColorActive,
              stroke: closeColorActive
            })
          ])
        ]),
        cE('icon', [
          cB('icon', {
            fill: iconColor,
            stroke: iconColor
          })
        ]),
        cB('alert-body', {
          border: `1px solid ${borderColor}`
        }, [
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
