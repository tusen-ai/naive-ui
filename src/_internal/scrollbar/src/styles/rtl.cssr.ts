import { c, cB, cE, cM } from '../../../../_utils/cssr'

export default cB('scrollbar', [
  cM('rtl', `
    direction: rtl;
  `, [
    c('>', [
      cB('scrollbar-rail', [
        cM('horizontal', [
          c('>', [
            cE('scrollbar', `
              left: 0;
              right: unset;
            `)
          ])
        ])
      ])
    ])
  ])
])
