import { c, cB, cE, cM, cNotM, insideModal, insidePopover } from '../../../_utils/cssr'

// vars:
// --th-padding
// --td-padding
// --font-size
// --bezier
// --th-font-weight
// --line-height
// --th-text-color
// --td-text-color
// --th-color
// --th-color-modal
// --th-color-popover
// --td-color
// --td-color-modal
// --td-color-popover
// --border-radius
// --border-color
// --border-color-modal
// --border-color-popover
export default c([
  cB('descriptions', {
    fontSize: 'var(--font-size)'
  }, [
    cB('descriptions-separator', `
      display: inline-block;
      margin: 0 8px 0 2px;
    `),
    cB('descriptions-table-wrapper', [
      cB('descriptions-table', [
        cB('descriptions-table-row', [
          cB('descriptions-table-header', {
            padding: 'var(--th-padding)'
          }),
          cB('descriptions-table-content', {
            padding: 'var(--td-padding)'
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
        border-radius: var(--border-radius);
        overflow: hidden;
        background: var(--merged-td-color);
        border: 1px solid var(--merged-border-color);
      `, [
        cB('descriptions-table', [
          cB('descriptions-table-row', [
            c('&:not(:last-child)', [
              cB('descriptions-table-content', {
                borderBottom: '1px solid var(--merged-border-color)'
              }),
              cB('descriptions-table-header', {
                borderBottom: '1px solid var(--merged-border-color)'
              })
            ]),
            cB('descriptions-table-header', `
              font-weight: 400;
              background-clip: padding-box;
              background-color: var(--merged-th-color);
            `, [
              c('&:not(:last-child)', {
                borderRight: '1px solid var(--merged-border-color)'
              })
            ]),
            cB('descriptions-table-content', [
              c('&:not(:last-child)', {
                borderRight: '1px solid var(--merged-border-color)'
              })
            ])
          ])
        ])
      ])
    ]),
    cB('descriptions-header', `
      font-weight: var(--th-font-weight);
      font-size: 18px;
      transition: color .3s var(--bezier);
      line-height: var(--line-height);
      margin-bottom: 16px;
      color: var(--th-text-color);
    `),
    cB('descriptions-table-wrapper', `
      transition:
        background-color .3s var(--bezier),
        border-color .3s var(--bezier);
    `, [
      cB('descriptions-table', `
        width: 100%;
        border-collapse: separate;
        border-spacing: 0;
        box-sizing: border-box;
      `, [
        cB('descriptions-table-row', `
          box-sizing: border-box;
          transition: border-color .3s var(--bezier);
        `, [
          cB('descriptions-table-header', `
            font-weight: var(--th-font-weight);
            line-height: var(--line-height);
            display: table-cell;
            box-sizing: border-box;
            color: var(--th-text-color);
            transition:
              color .3s var(--bezier),
              background-color .3s var(--bezier),
              border-color .3s var(--bezier);
          `),
          cB('descriptions-table-content', `
            vertical-align: top;
            line-height: var(--line-height);
            display: table-cell;
            box-sizing: border-box;
            color: var(--td-text-color);
            transition:
              color .3s var(--bezier),
              background-color .3s var(--bezier),
              border-color .3s var(--bezier);
          `, [
            cE('content', `
              transition: color .3s var(--bezier);
              display: inline-block;
              color: var(--td-text-color);
            `)
          ]),
          cE('label', `
            font-weight: var(--th-font-weight);
            transition: color .3s var(--bezier);
            display: inline-block;
            margin-right: 14px;
            color: var(--th-text-color);
          `)
        ])
      ])
    ])
  ]),
  cB('descriptions-table-wrapper', `
    --merged-th-color: var(--th-color);
    --merged-td-color: var(--td-color);
    --merged-border-color: var(--border-color);
  `),
  insideModal(
    cB('descriptions-table-wrapper', `
      --merged-th-color: var(--th-color-modal);
      --merged-td-color: var(--td-color-modal);
      --merged-border-color: var(--border-color-modal);
    `)
  ),
  insidePopover(
    cB('descriptions-table-wrapper', `
      --merged-th-color: var(--th-color-popover);
      --merged-td-color: var(--td-color-popover);
      --merged-border-color: var(--border-color-popover);
    `)
  )
])
