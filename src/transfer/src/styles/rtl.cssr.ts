import { c, cB, cE, cM } from '../../../_utils/cssr'

export default cB('transfer', [
  cM('rtl', `
    direction: rtl;
    text-align: right;
  `, [
    cB('transfer-list', [
      cM('source', `
        border-top-right-radius: var(--n-border-radius);
        border-top-left-radius: 0;
        border-bottom-right-radius: var(--n-border-radius);
        border-bottom-left-radius: 0;
    `, [
        cE('border', `
          border-left: 1px solid var(--n-divider-color);
        `)
      ]),
      cM('target', `
        border-top-right-radius: 0;
        border-top-left-radius: var(--n-border-radius);
        border-bottom-right-radius: 0;
        border-bottom-left-radius: var(--n-border-radius);
      `, [
        cE('border', `
          border-left: 1px solid var(--n-divider-color);
          border-right: none;
        `)
      ]),
      cB('transfer-list-header', [
        c('> *:not(:first-child)', `
          margin-left: 0;
          margin-right: 8px;
        `)
      ]),
      cB('transfer-list-body', [
        cB('transfer-list-flex-container', [
          cB('transfer-list-content', [
            cB('transfer-list-item', [
              cE('checkbox', `
                margin-right: 0;
                margin-left: 8px;
              `)
            ])
          ])
        ])
      ])
    ])
  ])
])
