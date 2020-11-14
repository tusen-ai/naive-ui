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
      closeColorPressed
    } = pallete
    return cTB('alert', [
      cM(type + '-type', {
        backgroundColor,
        textAlign: 'start'
      }, [
        cE('close', {
          color: closeColor
        }, [
          c('&:hover', {
            color: closeColorHover
          }),
          c('&:active', {
            color: closeColorPressed
          })
        ]),
        cE('icon', {
          color: iconColor
        }),
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
