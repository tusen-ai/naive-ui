import { c, cB, cM } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const size = props.$instance.size
    const padding = props.$local.padding[size]
    const borderedPadding = props.$local.borderedPadding[size]
    return cB('descriptions', [
      cM(`${size}-size`, [
        cB('descriptions-header', {
          marginBottom: padding
        }),
        cM('bordered', [
          cB('descriptions-table-wrapper', [
            cB('descriptions-table', [
              cB('descriptions-table-row', [
                cB('descriptions-table-header', {
                  padding: borderedPadding
                }),
                cB('descriptions-table-content', {
                  padding: borderedPadding
                }),
                c('&:last-child', [
                  cB('descriptions-table-content', {
                    padding: borderedPadding
                  })
                ])
              ])
            ])
          ])
        ]),
        cB('descriptions-table-wrapper', [
          cB('descriptions-table', [
            cB('descriptions-table-row', [
              cB('descriptions-table-content', {
                padding: `0 0 ${padding} 0`
              }),
              c('&:last-child', [
                cB('descriptions-table-content', {
                  padding: 0
                })
              ])
            ])
          ])
        ])
      ])
    ])
  }
])
