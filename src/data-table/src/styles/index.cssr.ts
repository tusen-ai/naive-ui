import { CNode } from 'css-render'
import { fadeInScaleUpTransition } from '../../../_styles/transitions/fade-in-scale-up.cssr'
import { iconSwitchTransition } from '../../../_styles/transitions/icon-switch.cssr'
import { c, cB, cE, cM, cNotM, insideModal, insidePopover } from '../../../_utils/cssr'

const fixedColumnStyle = createFixedColumnStyle()

// vars:
// --n-font-size
// --n-th-padding
// --n-td-padding
// --n-bezier
// --n-border-radius
// --n-line-height
// --n-border-color
// --n-border-color-modal
// --n-border-color-popover
// --n-th-color
// --n-th-color-hover
// --n-th-color-modal
// --n-th-color-hover-modal
// --n-th-color-popover
// --n-th-color-hover-popover
// --n-td-color
// --n-td-color-hover
// --n-td-color-modal
// --n-td-color-hover-modal
// --n-td-color-popover
// --n-td-color-hover-popover
// --n-th-text-color
// --n-td-text-color
// --n-th-font-weight
// --n-th-button-color-hover
// --n-th-icon-color
// --n-th-icon-color-active
// --n-filter-size
// --n-action-divider-color
// --n-action-padding
// --n-action-button-margin
// --n-pagination-margin
// --n-empty-padding
// --n-sorter-size
// --n-resizable-container-size
// --n-resizable-size
// --n-loading-size
// --n-loading-color
// --n-opacity-loading

// --n-box-shadow-before used in Body.tsx
// --n-box-shadow-after used in Body.tsx
export default c([
  cB('data-table', `
    width: 100%;
    font-size: var(--n-font-size);
    display: flex;
    flex-direction: column;
    position: relative;
    --n-merged-th-color: var(--n-th-color);
    --n-merged-td-color: var(--n-td-color);
    --n-merged-border-color: var(--n-border-color);
    --n-merged-th-color-hover: var(--n-th-color-hover);
    --n-merged-td-color-hover: var(--n-td-color-hover);
    --n-merged-td-color-striped: var(--n-td-color-striped);
  `, [
    cB('data-table-wrapper', `
      flex-grow: 1;
      display: flex;
      flex-direction: column;
    `),
    cM('flex-height', [
      c('>', [
        cB('data-table-wrapper', [
          c('>', [
            cB('data-table-base-table', `
              display: flex;
              flex-direction: column;
              flex-grow: 1;
            `, [
              c('>', [
                cB('data-table-base-table-body', 'flex-basis: 0;', [
                  // last-child means there is no empty icon
                  // body is a scrollbar, we need to override height 100%
                  c('&:last-child', 'flex-grow: 1;')
                ])
              ])
            ])
          ])
        ])
      ])
    ]),
    c('>', [
      cB('data-table-loading-wrapper', `
        color: var(--n-loading-color);
        font-size: var(--n-loading-size);
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
        transition: color .3s var(--n-bezier);
        display: flex;
        align-items: center;
        justify-content: center;
      `, [
        fadeInScaleUpTransition({
          originalTransform: 'translateX(-50%) translateY(-50%)'
        })
      ])
    ]),
    cB('data-table-expand-placeholder', `
      margin-right: 8px;
      display: inline-block;
      width: 16px;
      height: 1px;
    `),
    cB('data-table-indent', `
      display: inline-block;
      height: 1px;
    `),
    cB('data-table-expand-trigger', `
      display: inline-flex;
      margin-right: 8px;
      cursor: pointer;
      font-size: 16px;
      vertical-align: -0.2em;
      position: relative;
      width: 16px;
      height: 16px;
      color: var(--n-td-text-color);
      transition: color .3s var(--n-bezier);
    `, [
      cM('expanded', [
        cB('icon', 'transform: rotate(90deg);', [
          iconSwitchTransition({
            originalTransform: 'rotate(90deg)'
          })
        ]),
        cB('base-icon', 'transform: rotate(90deg);', [
          iconSwitchTransition({
            originalTransform: 'rotate(90deg)'
          })
        ])
      ]),
      cB('base-loading', `
        color: var(--n-loading-color);
        transition: color .3s var(--n-bezier);
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
      `, [
        iconSwitchTransition()
      ]),
      cB('icon', `
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
      `, [
        iconSwitchTransition()
      ]),
      cB('base-icon', `
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
      `, [
        iconSwitchTransition()
      ])
    ]),
    cB('data-table-thead', `
      transition: background-color .3s var(--n-bezier);
      background-color: var(--n-merged-th-color);
    `),
    cB('data-table-tr', `
      box-sizing: border-box;
      background-clip: padding-box;
      transition: background-color .3s var(--n-bezier);
    `, [
      cB('data-table-expand', `
        position: sticky;
        left: 0;
        overflow: hidden;
        margin: calc(var(--n-th-padding) * -1);
        padding: var(--n-th-padding);
        box-sizing: border-box;
      `),
      cM('striped', 'background-color: var(--n-merged-td-color-striped);', [
        cB('data-table-td', 'background-color: var(--n-merged-td-color-striped);')
      ]),
      cNotM('summary', [
        c('&:hover', 'background-color: var(--n-merged-td-color-hover);', [
          c('>', [
            cB('data-table-td', 'background-color: var(--n-merged-td-color-hover);')
          ])
        ])
      ])
    ]),
    cB('data-table-th', `
      padding: var(--n-th-padding);
      position: relative;
      text-align: start;
      box-sizing: border-box;
      background-color: var(--n-merged-th-color);
      border-color: var(--n-merged-border-color);
      border-bottom: 1px solid var(--n-merged-border-color);
      color: var(--n-th-text-color);
      transition:
        border-color .3s var(--n-bezier),
        color .3s var(--n-bezier),
        background-color .3s var(--n-bezier);
      font-weight: var(--n-th-font-weight);
    `, [
      cM('filterable', `
        padding-right: 36px;
      `, [
        cM('sortable', `
          padding-right: calc(var(--n-th-padding) + 36px);
        `)
      ]),
      fixedColumnStyle,
      cM('selection', `
        padding: 0;
        text-align: center;
        line-height: 0;
        z-index: 3;
      `),
      cE('title-wrapper', `
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
        max-width: 100%;
      `, [
        cE('title', `
          flex: 1;
          min-width: 0;
        `)
      ]),
      cE('ellipsis', `
        display: inline-block;
        vertical-align: bottom;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        max-width: 100%;
      `),
      cM('hover', `
        background-color: var(--n-merged-th-color-hover);
      `),
      cM('sortable', `
        cursor: pointer;
      `, [
        cE('ellipsis', `
          max-width: calc(100% - 18px);
        `),
        c('&:hover', `
          background-color: var(--n-merged-th-color-hover);
        `)
      ]),
      cB('data-table-sorter', `
        height: var(--n-sorter-size);
        width: var(--n-sorter-size);
        margin-left: 4px;
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        vertical-align: -0.2em;
        color: var(--n-th-icon-color);
        transition: color .3s var(--n-bezier);
      `, [
        cB('base-icon', 'transition: transform .3s var(--n-bezier)'),
        cM('desc', [
          cB('base-icon', `
            transform: rotate(0deg);
          `)
        ]),
        cM('asc', [
          cB('base-icon', `
            transform: rotate(-180deg);
          `)
        ]),
        cM('asc, desc', `
          color: var(--n-th-icon-color-active);
        `)
      ]),
      cB('data-table-resize-button', `
        width: var(--n-resizable-container-size);
        position: absolute;
        top: 0;
        right: calc(var(--n-resizable-container-size) / 2);
        bottom: 0;
        cursor: col-resize;
        user-select: none;
      `, [
        c('&::after', `
          width: var(--n-resizable-size);
          height: 50%;
          position: absolute;
          top: 50%;
          left: calc(var(--n-resizable-container-size) / 2);
          bottom: 0;
          background-color: var(--n-merged-border-color);
          transform: translateY(-50%);
          transition: background-color .3s var(--n-bezier);
          z-index: 1;
          content: '';
        `),
        cM('active', [
          c('&::after', `          
            background-color: var(--n-th-icon-color-active);
          `)
        ]),
        c('&:hover::after', `
          background-color: var(--n-th-icon-color-active);
        `)
      ]),
      cB('data-table-filter', `
        position: absolute;
        z-index: auto;
        right: 0;
        width: 36px;
        top: 0;
        bottom: 0;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        transition:
          background-color .3s var(--n-bezier),
          color .3s var(--n-bezier);
        font-size: var(--n-filter-size);
        color: var(--n-th-icon-color);
      `, [
        c('&:hover', `
          background-color: var(--n-th-button-color-hover);
        `),
        cM('show', `
          background-color: var(--n-th-button-color-hover);
        `),
        cM('active', `
          background-color: var(--n-th-button-color-hover);
          color: var(--n-th-icon-color-active);
        `)
      ])
    ]),
    cB('data-table-td', `
      padding: var(--n-td-padding);
      text-align: start;
      box-sizing: border-box;
      border: none;
      background-color: var(--n-merged-td-color);
      color: var(--n-td-text-color);
      border-bottom: 1px solid var(--n-merged-border-color);
      transition:
        box-shadow .3s var(--n-bezier),
        background-color .3s var(--n-bezier),
        border-color .3s var(--n-bezier),
        color .3s var(--n-bezier);
    `, [
      cM('expand', [
        cB('data-table-expand-trigger', `
          margin-right: 0;
        `)
      ]),
      cM('last-row', `
        border-bottom: 0 solid var(--n-merged-border-color);
      `, [
        // make sure there is no overlap between bottom border and
        // fixed column box shadow
        c('&::after', `
          bottom: 0 !important;
        `),
        c('&::before', `
          bottom: 0 !important;
        `)
      ]),
      cM('summary', `
        background-color: var(--n-merged-th-color);
      `),
      cM('hover', `
        background-color: var(--n-merged-td-color-hover);
      `),
      cE('ellipsis', `
        display: inline-block;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        max-width: 100%;
        vertical-align: bottom;
      `),
      cM('selection, expand', `
        text-align: center;
        padding: 0;
        line-height: 0;
      `),
      fixedColumnStyle
    ]),
    cB('data-table-empty', `
      box-sizing: border-box;
      padding: var(--n-empty-padding);
      flex-grow: 1;
      flex-shrink: 0;
      opacity: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: opacity .3s var(--n-bezier);
    `, [
      cM('hide', `
        opacity: 0;
      `)
    ]),
    cE('pagination', `
      margin: var(--n-pagination-margin);
      display: flex;
      justify-content: flex-end;
    `),
    cB('data-table-wrapper', `
      position: relative;
      opacity: 1;
      transition: opacity .3s var(--n-bezier), border-color .3s var(--n-bezier);
      border-top-left-radius: var(--n-border-radius);
      border-top-right-radius: var(--n-border-radius);
      line-height: var(--n-line-height);
    `),
    cM('loading', [
      cB('data-table-wrapper', `
        opacity: var(--n-opacity-loading);
        pointer-events: none;
      `)
    ]),
    cM('single-column', [
      cB('data-table-td', `
        border-bottom: 0 solid var(--n-merged-border-color);
      `, [
        c('&::after, &::before', `
          bottom: 0 !important;
        `)
      ])
    ]),
    cNotM('single-line', [
      cB('data-table-th', `
        border-right: 1px solid var(--n-merged-border-color);
      `, [
        cM('last', `
          border-right: 0 solid var(--n-merged-border-color);
        `)
      ]),
      cB('data-table-td', `
        border-right: 1px solid var(--n-merged-border-color);
      `, [
        cM('last-col', `
          border-right: 0 solid var(--n-merged-border-color);
        `)
      ])
    ]),
    cM('bordered', [
      cB('data-table-wrapper', `
        border: 1px solid var(--n-merged-border-color);
        border-bottom-left-radius: var(--n-border-radius);
        border-bottom-right-radius: var(--n-border-radius);
        overflow: hidden;
      `)
    ]),
    cB('data-table-base-table', [
      cM('transition-disabled', [
        cB('data-table-th', [c('&::after, &::before', 'transition: none;')]),
        cB('data-table-td', [c('&::after, &::before', 'transition: none;')])
      ])
    ]),
    cM('bottom-bordered', [
      cB('data-table-td', [
        cM('last-row', `
          border-bottom: 1px solid var(--n-merged-border-color);
        `)
      ])
    ]),
    cB('data-table-table', `
      font-variant-numeric: tabular-nums;
      width: 100%;
      word-break: break-word;
      transition: background-color .3s var(--n-bezier);
      border-collapse: separate;
      border-spacing: 0;
      background-color: var(--n-merged-td-color);
    `),
    cB('data-table-base-table-header', `
      border-top-left-radius: calc(var(--n-border-radius) - 1px);
      border-top-right-radius: calc(var(--n-border-radius) - 1px);
      z-index: 3;
      overflow: scroll;
      flex-shrink: 0;
      transition: border-color .3s var(--n-bezier);
      scrollbar-width: none;
    `, [
      c('&::-webkit-scrollbar', `
        width: 0;
        height: 0;
      `)
    ]),
    cB('data-table-check-extra', `
      transition: color .3s var(--n-bezier);
      color: var(--n-th-icon-color);
      position: absolute;
      font-size: 14px;
      right: -4px;
      top: 50%;
      transform: translateY(-50%);
      z-index: 1;
    `)
  ]),
  cB('data-table-filter-menu', [
    cB('scrollbar', `
      max-height: 240px;
    `),
    cE('group', `
      display: flex;
      flex-direction: column;
      padding: 12px 12px 0 12px;
    `, [
      cB('checkbox', `
        margin-bottom: 12px;
        margin-right: 0;
      `),
      cB('radio', `
        margin-bottom: 12px;
        margin-right: 0;
      `)
    ]),
    cE('action', `
      padding: var(--n-action-padding);
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-evenly;
      border-top: 1px solid var(--n-action-divider-color);
    `, [
      cB('button', [
        c('&:not(:last-child)', `
          margin: var(--n-action-button-margin);
        `),
        c('&:last-child', `
          margin-right: 0;
        `)
      ])
    ]),
    cB('divider', `
      margin: 0 !important;
    `)
  ]),
  insideModal(cB('data-table', `
    --n-merged-th-color: var(--n-th-color-modal);
    --n-merged-td-color: var(--n-td-color-modal);
    --n-merged-border-color: var(--n-border-color-modal);
    --n-merged-th-color-hover: var(--n-th-color-hover-modal);
    --n-merged-td-color-hover: var(--n-td-color-hover-modal);
    --n-merged-td-color-striped: var(--n-td-color-striped-modal);
  `)),
  insidePopover(cB('data-table', `
    --n-merged-th-color: var(--n-th-color-popover);
    --n-merged-td-color: var(--n-td-color-popover);
    --n-merged-border-color: var(--n-border-color-popover);
    --n-merged-th-color-hover: var(--n-th-color-hover-popover);
    --n-merged-td-color-hover: var(--n-td-color-hover-popover);
    --n-merged-td-color-striped: var(--n-td-color-striped-popover);
  `))
])

function createFixedColumnStyle (): CNode[] {
  return [
    cM('fixed-left', `
      left: 0;
      position: sticky;
      z-index: 2;
    `, [
      c('&::after', `
        pointer-events: none;
        content: "";
        width: 36px;
        display: inline-block;
        position: absolute;
        top: 0;
        bottom: -1px;
        transition: box-shadow .2s var(--n-bezier);
        right: -36px;
      `)
    ]),
    cM('fixed-right', `
      right: 0;
      position: sticky;
      z-index: 1;
    `, [
      c('&::before', `
        pointer-events: none;
        content: "";
        width: 36px;
        display: inline-block;
        position: absolute;
        top: 0;
        bottom: -1px;
        transition: box-shadow .2s var(--n-bezier);
        left: -36px;
      `)
    ])
  ]
}
