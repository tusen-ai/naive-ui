import { c, cB, cE, cM, insideModal, cNotM } from '../../../_utils/cssr'
import iconSwitchTransition from '../../../_styles/transitions/icon-switch'

// vars:
// --bezier
// --size
// --border
// --border-focus
// --border-active
// --border-disabled
// --box-shadow-focus
// --color
// --color-active
// --color-table-header
// --color-table-header-modal
// --color-disabled
// --text-color
// --text-color-disabled
// --check-mark-color
// --check-mark-color-disabled
// --border-radius
// --font-size
export default c([
  cB('checkbox', `
    line-height: 1;
    font-size: var(--font-size);
    outline: none;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    white-space: nowrap;
    vertical-align: middle;
  `,
  [
    c('&:hover', [
      cB('checkbox-box', [
        cE('border', {
          border: 'var(--border-active)'
        })
      ])
    ]),
    c('&:focus:not(:active)', [
      cB('checkbox-box', [
        cE('border', {
          border: 'var(--border-focus)',
          boxShadow: 'var(--box-shadow-focus)'
        })
      ])
    ]),
    cM('table-header', [
      cB('checkbox-box', {
        backgroundColor: 'var(--color-table-header)'
      })
    ]),
    cM('checked', [
      cB('checkbox-box', {
        backgroundColor: 'var(--color-active)'
      }, [
        cB('checkbox-icon', [
          cE('check', `
            opacity: 1;
            transform: scale(1);
          `)
        ])
      ])
    ]),
    cM('indeterminate', [
      cB('checkbox-box', [
        cB('checkbox-icon', [
          cE('check', `
            opacity: 0;
            transform: scale(.5);
          `),
          cE('line', `
            opacity: 1;
            transform: scale(1);
          `)
        ])
      ])
    ]),
    cM('checked, indeterminate', [
      c('&:focus:not(:active)', [
        cB('checkbox-box', [
          cE('border', {
            border: 'var(--border-active)',
            boxShadow: 'var(--box-shadow-focus)'
          })
        ])
      ]),
      cB('checkbox-box', `
        background-color: var(--color-active);
        border-left: 0;
        border-top: 0;
      `, [
        cE('border', {
          border: 'var(--border-active)'
        })
      ])
    ]),
    cM('disabled', {
      cursor: 'not-allowed'
    }, [
      cB('checkbox-box', `
        background-color: var(--color-disabled);
      `, [
        cE('border', {
          border: 'var(--border-disabled)'
        }),
        cB('checkbox-icon', [
          cE('check, line', {
            fill: 'var(--check-mark-color-disabled)'
          })
        ])
      ]),
      cE('label', {
        color: 'var(--text-color-disabled)'
      })
    ]),
    cB('checkbox-box', `
      height: var(--size);
      width: var(--size);
      display: inline-block;
      box-sizing: border-box;
      border-radius: var(--border-radius);
      background-color: var(--color);
      position: relative;
      transition:
        background-color 0.3s var(--bezier);
    `, [
      cE('border', `
        transition:
          border-color .3s var(--bezier),
          box-shadow .3s var(--bezier);
        border-radius: inherit;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        border: var(--border);
      `),
      cB('checkbox-icon', `
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
      `, [
        cE('line, check', `
          fill: var(--check-mark-color);
          width: calc(100% - 2px);
          opacity: 0;
          transform: scale(0.5);
          transform-origin: center;
          transition:
            fill 0.3s var(--bezier),
            transform 0.3s var(--bezier),
            opacity 0.3s var(--bezier),
            border-color 0.3s var(--bezier);
        `),
        iconSwitchTransition()
      ])
    ]),
    cE('label', `
      color: var(--text-color);
      transition: color .3s var(--bezier);
      user-select: none;
      padding: 0 8px;
    `, [
      c('&:empty', {
        display: 'none'
      })
    ])
  ]),
  // modal table header checkbox
  insideModal(
    cB('checkbox', [
      cM('table-header', [
        cNotM('checked', [
          cNotM('indeterminate', [
            cNotM('disabled', [
              cB('checkbox-box', {
                backgroundColor: 'var(--color-table-header-modal)'
              })
            ])
          ])
        ])
      ])
    ])
  )
])
