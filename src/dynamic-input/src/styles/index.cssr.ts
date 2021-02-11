import { c, cB, cM, cE } from '../../../_utils/cssr'

// vars:
// --action-margin
export default cB('dynamic-input', {
  width: '100%'
}, [
  cB('dynamic-input-item', `
    margin-bottom: 10px;
    display: flex;
    flex-wrap: nowrap;
  `,
  [
    cB('dynamic-input-preset-input', {
      flex: 1,
      alignItems: 'center'
    }),
    cB('dynamic-input-preset-pair', `
      flex: 1;
      display: flex;
      align-items: center;
    `, [
      cB('dynamic-input-pair-input', [
        c('&:first-child', {
          'margin-right': '12px'
        })
      ])
    ]),
    cE('action', `
      align-self: flex-start;
      display: flex;
      justify-content: flex-end;
      flex-shrink: 0;
      flex-grow: 0;
      margin: var(--action-margin);
    `, [
      cM('icon', {
        cursor: 'pointer'
      })
    ]),
    c('&:last-child', {
      marginBottom: 0
    })
  ]),
  cB('form-item', `
    padding-top: 0 !important;
    margin-right: 0 !important;
  `, [
    cB('form-item-blank', {
      paddingTop: '0 !important'
    })
  ])
])
