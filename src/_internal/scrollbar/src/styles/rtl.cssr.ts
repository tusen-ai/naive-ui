import { cB, c, cM, cE } from '../../../../_utils/cssr'

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
        ]),
        cM('vertical', `
          left: 4px;
          right: unset;
        `)
      ])
    ])
  ])
])
