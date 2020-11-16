import { c, cTB, cB, cE, cM, createKey } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const type = props.$instance.type
    const { $local } = props
    return cTB('alert', [
      cM(type + '-type', {
        backgroundColor: $local[createKey('color', type)],
        textAlign: 'start'
      }, [
        cE('close', {
          color: $local[createKey('closeColor', type)]
        }, [
          c('&:hover', {
            color: $local[createKey('closeColorHover', type)]
          }),
          c('&:active', {
            color: $local[createKey('closeColorPressed', type)]
          })
        ]),
        cE('icon', {
          color: $local[createKey('iconColor', type)]
        }),
        cB('alert-body', {
          border: $local[createKey('border', type)]
        }, [
          cE('title', {
            color: $local[createKey('titleTextColor', type)]
          }),
          cE('content', {
            color: $local[createKey('contentTextColor', type)]
          })
        ])
      ])
    ])
  }
])
