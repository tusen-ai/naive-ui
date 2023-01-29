import { c, cB, cM, cE } from '../../../_utils/cssr'

export default cB('upload', [
  cM('rtl', `
    direction: rtl;
    text-align: right;
  `, [
    cB('upload-file-list', [
      cB('upload-file', `
        padding: 0px 6px 0 12px;
      `, [
        cB('upload-file-info', [
          cE('action', `
            right: unset;
            left: 0;
          `, [
            cB('button', [
              c('&:not(:last-child)', `
                margin-right: 0;
                margin-left: 4px;
              `)
            ])
          ])
        ])
      ])
    ])
  ])
])
