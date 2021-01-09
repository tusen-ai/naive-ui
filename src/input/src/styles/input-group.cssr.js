import { c, cB, cE } from '../../../_utils/cssr'

export default cB('input-group', `
  display: inline-flex;
  width: 100%;
  flex-wrap: nowrap;
  vertical-align: bottom;
`, [
  c('>', [
    cB('input', [
      c('&:not(:last-child)', `
        border-top-right-radius: 0!important;
        border-bottom-right-radius: 0!important;
      `),
      c('&:not(:first-child)', `
        border-top-left-radius: 0!important;
        border-bottom-left-radius: 0!important;
        margin-left: -1px!important;
      `)
    ]),
    cB('button', [
      c('&:not(:last-child)', `
        border-top-right-radius: 0!important;
        border-bottom-right-radius: 0!important;
      `, [
        cE('state-border, border', `
          border-top-right-radius: 0!important;
          border-bottom-right-radius: 0!important;
        `)
      ]),
      c('&:not(:first-child)', `
        border-top-left-radius: 0!important;
        border-bottom-left-radius: 0!important;
      `, [
        cE('state-border, border', `
          border-top-left-radius: 0!important;
          border-bottom-left-radius: 0!important;
        `)
      ])
    ]),
    c('*', [
      c('&:not(:last-child)', `
        border-top-right-radius: 0!important;
        border-bottom-right-radius: 0!important;
      `, [
        c('>', [
          cB('input', `
            border-top-right-radius: 0!important;
            border-bottom-right-radius: 0!important;
          `),
          cB('base-selection', [
            cB('base-selection-label', `
              border-top-right-radius: 0!important;
              border-bottom-right-radius: 0!important;
            `),
            cB('base-selection-tags', `
              border-top-right-radius: 0!important;
              border-bottom-right-radius: 0!important;
            `),
            cE('box-shadow, border, state-border', `
              border-top-right-radius: 0!important;
              border-bottom-right-radius: 0!important;
            `)
          ])
        ])
      ]),
      c('&:not(:first-child)', `
        margin-left: -1px!important;
        border-top-left-radius: 0!important;
        border-bottom-left-radius: 0!important;
      `, [
        c('>', [
          cB('input', `
            border-top-left-radius: 0!important;
            border-bottom-left-radius: 0!important;
          `),
          cB('base-selection', [
            cB('base-selection-label', `
              border-top-left-radius: 0!important;
              border-bottom-left-radius: 0!important;
            `),
            cB('base-selection-tags', `
              border-top-left-radius: 0!important;
              border-bottom-left-radius: 0!important;
            `),
            cE('box-shadow, border, state-border', `
              border-top-left-radius: 0!important;
              border-bottom-left-radius: 0!important;
            `)
          ])
        ])
      ])
    ])
  ])
])
