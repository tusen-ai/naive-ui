import { c, cB, cE, cM, insideModal, insidePopover } from '../../../_utils/cssr'
import { iconSwitchTransition } from '../../../_styles/transitions/icon-switch.cssr'

// vars:
// --n-label-line-height
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
// --n-color-table
// --n-color-table-modal
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
    line-height: var(--n-label-line-height);
    font-size: var(--n-font-size);
    outline: none;
    cursor: pointer;
    display: inline-flex;
    flex-wrap: nowrap;
    align-items: flex-start;
    word-break: break-word;
    --n-merged-color-table: var(--n-color-table);
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
        cE('border', `
          border: var(--n-border-focus);
          box-shadow: var(--n-box-shadow-focus);
        `)
      ])
    ]),
    cM('inside-table', [
      cB('checkbox-box', `
        background-color: var(--n-merged-color-table);
      `)
    ]),
    cM('checked', [
      cB('checkbox-box', `
        background-color: var(--n-color-checked);
      `, [
        cB('checkbox-icon', [
          // if not set width to 100%, safari & old chrome won't display the icon
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
          cE('border', `
            border: var(--n-border-checked);
            box-shadow: var(--n-box-shadow-focus);
          `)
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
    cB('checkbox-box-wrapper', `
      position: relative;
      width: var(--n-size);
      flex-shrink: 0;
      flex-grow: 0;
      user-select: none;
      -webkit-user-select: none;
    `),
    cB('checkbox-box', `
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      height: var(--n-size);
      width: var(--n-size);
      display: inline-block;
      box-sizing: border-box;
      border-radius: var(--n-border-radius);
      background-color: var(--n-color);
      transition: background-color 0.3s var(--n-bezier);
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
          width: 100%;
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
      -webkit-user-select: none;
      padding: var(--n-label-padding);
      font-weight: var(--n-label-font-weight);
    `, [
      c('&:empty', {
        display: 'none'
      })
    ])
  ]),
  // modal table header checkbox
  insideModal(
    cB('checkbox', `
      --n-merged-color-table: var(--n-color-table-modal);
    `)
  ),
  // popover table header checkbox
  insidePopover(
    cB('checkbox', `
      --n-merged-color-table: var(--n-color-table-popover);
    `)
  )
])
