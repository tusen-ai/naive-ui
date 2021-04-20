import { c, cB, cE, cM, insideModal, insidePopover } from '../../../_utils/cssr'
import iconSwitchTransition from '../../../_styles/transitions/icon-switch.cssr'

// vars:
// --bezier
// --size
// --border
// --border-focus
// --border-checked
// --border-disabled
// --border-disabled-checked
// --box-shadow-focus
// --color
// --color-checked
// --color-table-header
// --color-table-header-modal
// --color-disabled
// --color-disabled-checked
// --text-color
// --text-color-disabled
// --check-mark-color
// --check-mark-color-disabled
// --check-mark-color-disabled-checked
// --border-radius
// --font-size
// --label-padding
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
    --merged-color-table-header: var(--color-table-header);
  `, [
    c('&:hover', [
      cB('checkbox-box', [
        cE('border', {
          border: 'var(--border-checked)'
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
        backgroundColor: 'var(--merged-color-table-header)'
      })
    ]),
    cM('checked', [
      cB('checkbox-box', {
        backgroundColor: 'var(--color-checked)'
      }, [
        cB('checkbox-icon', [
          c('.check-icon', `
            opacity: 1;
            transform: scale(1);
          `)
        ])
      ])
    ]),
    cM('indeterminate', [
      cB('checkbox-box', [
        cB('checkbox-icon', [
          c('.check-icon', `
            opacity: 0;
            transform: scale(.5);
          `),
          c('.line-icon', `
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
            border: 'var(--border-checked)',
            boxShadow: 'var(--box-shadow-focus)'
          })
        ])
      ]),
      cB('checkbox-box', `
        background-color: var(--color-checked);
        border-left: 0;
        border-top: 0;
      `, [
        cE('border', {
          border: 'var(--border-checked)'
        })
      ])
    ]),
    cM('disabled', {
      cursor: 'not-allowed'
    }, [
      cM('checked', [
        cB('checkbox-box', `
          background-color: var(--color-disabled-checked);
        `, [
          cE('border', {
            border: 'var(--border-disabled-checked)'
          }),
          cB('checkbox-icon', [
            c('.check-icon, .line-icon', {
              fill: 'var(--check-mark-color-disabled-checked)'
            })
          ])
        ])
      ]),
      cB('checkbox-box', `
        background-color: var(--color-disabled);
      `, [
        cE('border', {
          border: 'var(--border-disabled)'
        }),
        cB('checkbox-icon', [
          c('.check-icon, .line-icon', {
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
        left: 1px;
        right: 1px;
        top: 1px;
        bottom: 1px;
      `, [
        c('.check-icon, .line-icon', `
          fill: var(--check-mark-color);
          opacity: 0;
          transform: scale(0.5);
          transform-origin: center;
          transition:
            fill 0.3s var(--bezier),
            transform 0.3s var(--bezier),
            opacity 0.3s var(--bezier),
            border-color 0.3s var(--bezier);
        `),
        iconSwitchTransition({
          left: '1px',
          top: '1px'
        })
      ])
    ]),
    cE('label', `
      color: var(--text-color);
      transition: color .3s var(--bezier);
      user-select: none;
      padding: var(--label-padding);
    `, [
      c('&:empty', {
        display: 'none'
      })
    ])
  ]),
  // modal table header checkbox
  insideModal(
    cB('checkbox', `
      --merged-color-table-header: var(--color-table-header-modal);
    `)
  ),
  // popover table header checkbox
  insidePopover(
    cB('checkbox', `
      --merged-color-table-header: var(--color-table-header-popover);
    `)
  )
])
