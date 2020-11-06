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
        cE('close', [
          cB('icon', {
            color: closeColor
          }),
          c('&:hover', [
            cB('icon', {
              color: closeColorHover
            })
          ]),
          c('&:active', [
            cB('icon', {
              color: closeColorPressed
            })
          ])
        ]),
        cE('icon', [
          cB('icon', {
            color: iconColor
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
