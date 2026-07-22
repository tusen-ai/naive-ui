import { c, cB, cE, cM } from '../../../_utils/cssr'

export default cB('tabs', [
  cM('rtl', `
    direction: rtl;
  `, [
    // Keep physical left/right placement under direction: rtl
    cM('left', `
      flex-direction: row-reverse;
    `),
    cM('right', `
      flex-direction: row;
    `),
    cB('tabs-nav', [
      cE('prefix', `
        padding-left: 16px;
        padding-right: 0;
      `),
      cE('suffix', `
        padding-right: 16px;
        padding-left: 0;
      `)
    ]),
    cB('tabs-tab', [
      cE('close', `
        margin-left: 0;
        margin-right: 6px;
      `)
    ]),
    cM('top, bottom', [
      c('>', [
        cB('tabs-nav', [
          cB('tabs-nav-scroll-wrapper', [
            c('&::before', `
              left: unset;
              right: 0;
            `),
            c('&::after', `
              right: unset;
              left: 0;
            `),
            cM('shadow-start', [
              c('&::before', `
                box-shadow: inset -10px 0 8px -8px rgba(0, 0, 0, .12);
              `)
            ]),
            cM('shadow-end', [
              c('&::after', `
                box-shadow: inset 10px 0 8px -8px rgba(0, 0, 0, .12);
              `)
            ])
          ])
        ])
      ])
    ]),
    cB('tab-pane', [
      c('&.next-transition-enter-from, &.prev-transition-leave-to', `
        transform: translateX(-32px);
      `),
      c('&.next-transition-leave-to, &.prev-transition-enter-from', `
        transform: translateX(32px);
      `)
    ]),
    cB('tabs-nav', [
      cM('card-type', [
        cB('tabs-tab', [
          cM('closable', `
            padding-left: 8px;
            padding-right: unset;
          `)
        ])
      ])
    ]),
    cB('tabs-scroll-button', [
      cM('start', `
        padding-left: 6px;
        padding-right: 10px;
      `),
      cM('end', `
        padding-right: 6px;
        padding-left: 10px;
      `)
    ])
  ])
])
