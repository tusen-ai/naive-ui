import { c, cE, cM, cTB, cNotM, createKey } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const {
      $vm: {
        type
      },
      $local
    } = props
    return cTB('tag', [
      cNotM('checkable', [
        cM(`${type}-type`, {
          boxShadow: `inset 0 0 0 1px ${$local[createKey('borderColor', type)]}`,
          color: $local[createKey('textColor', type)],
          backgroundColor: $local[createKey('color', type)]
        }, [
          cE('close', {
            color: $local[createKey('closeColor', type)]
          }),
          cNotM('disabled', [
            cE('close', [
              c('&:hover', {
                color: $local[createKey('closeColorHover', type)]
              }),
              c('&:active', {
                color: $local[createKey('closeColorPressed', type)]
              })
            ])
          ])
        ])
      ])
    ])
  }
])
