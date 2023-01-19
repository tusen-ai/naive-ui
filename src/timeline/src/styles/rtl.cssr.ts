import { c, cB, cE, cM } from '../../../_utils/cssr'

export default cB('timeline', [
  cM('rtl', `
    direction: rtl;
    text-align: right;
  `, [
    cM('horizontal', [
      c('>', [
        cB('timeline-item', `
          direction: rtl;
          text-align: right;
          padding-right: 0;
          padding-left: 40px;
        `, [
          c('>', [
            cB('timeline-item-timeline', [
              cE('line', `
                right: var(--n-icon-size);
                left: 0px;
              `)
            ])
          ])
        ])
      ])
    ]),
    cB('timeline-item', `
      direction: ltr;
      text-align: left;
    `)
  ])
])
