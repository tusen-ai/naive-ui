import { c, cB, cE, cM, insideModal, insidePopover } from '../../../_utils/cssr'
import iconSwitchTransition from '../../../_styles/transitions/icon-switch.cssr'

// vars:
// --n-bezier
// --n-size
// --n-border
// --n-border-focus
// --n-border-checked
// --n-border-disabled
// --n-border-disabled-checked
// --n-box-shadow-focus
// --n-color
// --n-color-checked
// --n-color-table-header
// --n-color-table-header-modal
// --n-color-disabled
// --n-color-disabled-checked
// --n-text-color
// --n-text-color-disabled
// --n-check-mark-color
// --n-check-mark-color-disabled
// --n-check-mark-color-disabled-checked
// --n-border-radius
// --n-font-size
// --n-label-padding
export default c([
  cB('checkbox', `
    line-height: 1;
    font-size: var(--n-font-size);
    outline: none;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    white-space: nowrap;
    vertical-align: middle;
    --n-merged-color-table-header: var(--n-color-table-header);
  `, [
    c('&:hover', [
      cB('checkbox-box', [
        cE('border', {
          border: 'var(--n-border-checked)'
        })
      ])
    ]),
    c('&:focus:not(:active)', [
      cB('checkbox-box', [
        cE('border', {
          border: 'var(--n-border-focus)',
          boxShadow: 'var(--n-box-shadow-focus)'
        })
      ])
    ]),
    cM('table-header', [
      cB('checkbox-box', {
        backgroundColor: 'var(--n-merged-color-table-header)'
      })
    ]),
    cM('checked', [
      cB('checkbox-box', {
        backgroundColor: 'var(--n-color-checked)'
      }, [
        cB('checkbox-icon', [
          // if not set width to 100%, safari & old chrome won't display the icon
          c('.check-icon', `
            width: 100%;
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
            border: 'var(--n-border-checked)',
            boxShadow: 'var(--n-box-shadow-focus)'
          })
        ])
      ]),
      cB('checkbox-box', `
        background-color: var(--n-color-checked);
        border-left: 0;
        border-top: 0;
      `, [
        cE('border', {
          border: 'var(--n-border-checked)'
        })
      ])
    ]),
    cM('disabled', {
      cursor: 'not-allowed'
    }, [
      cM('checked', [
        cB('checkbox-box', `
          background-color: var(--n-color-disabled-checked);
        `, [
          cE('border', {
            border: 'var(--n-border-disabled-checked)'
          }),
          cB('checkbox-icon', [
            c('.check-icon, .line-icon', {
              fill: 'var(--n-check-mark-color-disabled-checked)'
            })
          ])
        ])
      ]),
      cB('checkbox-box', `
        background-color: var(--n-color-disabled);
      `, [
        cE('border', {
          border: 'var(--n-border-disabled)'
        }),
        cB('checkbox-icon', [
          c('.check-icon, .line-icon', {
            fill: 'var(--n-check-mark-color-disabled)'
          })
        ])
      ]),
      cE('label', {
        color: 'var(--n-text-color-disabled)'
      })
    ]),
    cB('checkbox-box', `
      height: var(--n-size);
      width: var(--n-size);
      display: inline-block;
      box-sizing: border-box;
      border-radius: var(--n-border-radius);
      background-color: var(--n-color);
      position: relative;
      transition:
        background-color 0.3s var(--n-bezier);
    `, [
      cE('border', `
        transition:
          border-color .3s var(--n-bezier),
          box-shadow .3s var(--n-bezier);
        border-radius: inherit;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        border: var(--n-border);
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
          fill: var(--n-check-mark-color);
          opacity: 0;
          transform: scale(0.5);
          transform-origin: center;
          transition:
            fill 0.3s var(--n-bezier),
            transform 0.3s var(--n-bezier),
            opacity 0.3s var(--n-bezier),
            border-color 0.3s var(--n-bezier);
        `),
        iconSwitchTransition({
          left: '1px',
          top: '1px'
        })
      ])
    ]),
    cE('label', `
      color: var(--n-text-color);
      transition: color .3s var(--n-bezier);
      user-select: none;
      padding: var(--n-label-padding);
    `, [
      c('&:empty', {
        display: 'none'
      })
    ])
  ]),
  // modal table header checkbox
  insideModal(
    cB('checkbox', `
      --n-merged-color-table-header: var(--n-color-table-header-modal);
    `)
  ),
  // popover table header checkbox
  insidePopover(
    cB('checkbox', `
      --n-merged-color-table-header: var(--n-color-table-header-popover);
    `)
  )
])
