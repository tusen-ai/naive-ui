import { c, cB, cE, cM, cNotM, insideModal, insidePopover } from '../../../_utils/cssr'

// vars:
// --n-th-padding
// --n-td-padding
// --n-font-size
// --n-bezier
// --n-th-font-weight
// --n-line-height
// --n-th-text-color
// --n-td-text-color
// --n-th-color
// --n-th-color-modal
// --n-th-color-popover
// --n-td-color
// --n-td-color-modal
// --n-td-color-popover
// --n-border-radius
// --n-border-color
// --n-border-color-modal
// --n-border-color-popover
// --n-title-text-color
export default c([
  cB('descriptions', {
    fontSize: 'var(--n-font-size)'
  }, [
    cB('descriptions-separator', `
      display: inline-block;
      margin: 0 8px 0 2px;
    `),
    cB('descriptions-table-wrapper', [
      cB('descriptions-table', [
        cB('descriptions-table-row', [
          cB('descriptions-table-header', {
            padding: 'var(--n-th-padding)'
          }),
          cB('descriptions-table-content', {
            padding: 'var(--n-td-padding)'
          })
        ])
      ])
    ]),
    cNotM('bordered', [
      cB('descriptions-table-wrapper', [
        cB('descriptions-table', [
          cB('descriptions-table-row', [
            c('&:last-child', [
              cB('descriptions-table-content', {
                paddingBottom: 0
              })
            ])
          ])
        ])
      ])
    ]),
    cM('left-label-placement', [
      cB('descriptions-table-content', [
        c('> *', {
          verticalAlign: 'top'
        })
      ])
    ]),
    cM('left-label-align', [
      c('th', {
        textAlign: 'left'
      })
    ]),
    cM('center-label-align', [
      c('th', {
        textAlign: 'center'
      })
    ]),
    cM('right-label-align', [
      c('th', {
        textAlign: 'right'
      })
    ]),
    cM('bordered', [
      cB('descriptions-table-wrapper', `
        border-radius: var(--n-border-radius);
        overflow: hidden;
        background: var(--n-merged-td-color);
        border: 1px solid var(--n-merged-border-color);
      `, [
        cB('descriptions-table', [
          cB('descriptions-table-row', [
            c('&:not(:last-child)', [
              cB('descriptions-table-content', {
                borderBottom: '1px solid var(--n-merged-border-color)'
              }),
              cB('descriptions-table-header', {
                borderBottom: '1px solid var(--n-merged-border-color)'
              })
            ]),
            cB('descriptions-table-header', `
              font-weight: 400;
              background-clip: padding-box;
              background-color: var(--n-merged-th-color);
            `, [
              c('&:not(:last-child)', {
                borderRight: '1px solid var(--n-merged-border-color)'
              })
            ]),
            cB('descriptions-table-content', [
              c('&:not(:last-child)', {
                borderRight: '1px solid var(--n-merged-border-color)'
              })
            ])
          ])
        ])
      ])
    ]),
    cB('descriptions-header', `
      font-weight: var(--n-th-font-weight);
      font-size: 18px;
      transition: color .3s var(--n-bezier);
      line-height: var(--n-line-height);
      margin-bottom: 16px;
      color: var(--n-title-text-color);
    `),
    cB('descriptions-table-wrapper', `
      transition:
        background-color .3s var(--n-bezier),
        border-color .3s var(--n-bezier);
    `, [
      cB('descriptions-table', `
        width: 100%;
        border-collapse: separate;
        border-spacing: 0;
        box-sizing: border-box;
      `, [
        cB('descriptions-table-row', `
          box-sizing: border-box;
          transition: border-color .3s var(--n-bezier);
        `, [
          cB('descriptions-table-header', `
            font-weight: var(--n-th-font-weight);
            line-height: var(--n-line-height);
            display: table-cell;
            box-sizing: border-box;
            color: var(--n-th-text-color);
            transition:
              color .3s var(--n-bezier),
              background-color .3s var(--n-bezier),
              border-color .3s var(--n-bezier);
          `),
          cB('descriptions-table-content', `
            vertical-align: top;
            line-height: var(--n-line-height);
            display: table-cell;
            box-sizing: border-box;
            color: var(--n-td-text-color);
            transition:
              color .3s var(--n-bezier),
              background-color .3s var(--n-bezier),
              border-color .3s var(--n-bezier);
          `, [
            cE('content', `
              transition: color .3s var(--n-bezier);
              display: inline-block;
              color: var(--n-td-text-color);
            `)
          ]),
          cE('label', `
            font-weight: var(--n-th-font-weight);
            transition: color .3s var(--n-bezier);
            display: inline-block;
            margin-right: 14px;
            color: var(--n-th-text-color);
          `)
        ])
      ])
    ])
  ]),
  cB('descriptions-table-wrapper', `
    --n-merged-th-color: var(--n-th-color);
    --n-merged-td-color: var(--n-td-color);
    --n-merged-border-color: var(--n-border-color);
  `),
  insideModal(
    cB('descriptions-table-wrapper', `
      --n-merged-th-color: var(--n-th-color-modal);
      --n-merged-td-color: var(--n-td-color-modal);
      --n-merged-border-color: var(--n-border-color-modal);
    `)
  ),
  insidePopover(
    cB('descriptions-table-wrapper', `
      --n-merged-th-color: var(--n-th-color-popover);
      --n-merged-td-color: var(--n-td-color-popover);
      --n-merged-border-color: var(--n-border-color-popover);
    `)
  )
])
