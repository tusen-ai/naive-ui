import { c, cB, cM, cE } from '../../../_utils/cssr'

export default c([
  cB('steps', [
    cM('rtl', `
      direction: rtl;
      text-align: right;
    `, [
      cB('step-content', [
        cB('step-content-header', `
          margin-left: 0;
          margin-right: 9px;
        `),
        cE('description', `
          margin-left: 0;
          margin-right: 9px;
        `)
      ]),
      cM('vertical', [
        c('>', [
          cB('step', [
            c('>', [
              cB('step-indicator', [
                c('>', [
                  cB('step-splitor', `
                    left: unset;
                    right: calc(var(--n-indicator-size) / 2);
                  `)
                ])
              ])
            ])
          ])
        ])
      ])
    ])
  ])
])
