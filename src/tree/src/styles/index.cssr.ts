import { c, cB, cE, cM, cNotM } from '../../../_utils/cssr'
import { iconSwitchTransition } from '../../../_styles/transitions/icon-switch.cssr'
import { fadeInHeightExpandTransition } from '../../../_styles/transitions/fade-in-height-expand.cssr'

const iconSwitchTransitionNode = iconSwitchTransition()

// vars:
// --n-arrow-color
// --n-bezier
// --n-font-size
// --n-node-border-radius
// --n-node-color-active
// --n-node-color-hover
// --n-node-color-pressed
// --n-node-text-color
// --n-node-text-color-disabled
// --n-node-wrapper-padding
// --n-line-offset-top
// --n-line-offset-bottom
// --n-node-content-height
// --n-line-height
// --n-line-color
export default cB('tree', `
  font-size: var(--n-font-size);
  outline: none;
`, [
  c('ul, li', `
    margin: 0;
    padding: 0;
    list-style: none;
  `),
  c('>', [
    cB('tree-node', [
      c('&:first-child', 'margin-top: 0;')
    ])
  ]),
  cB('tree-motion-wrapper', [
    cM('expand', [
      fadeInHeightExpandTransition({
        duration: '0.2s'
      })
    ]),
    cM('collapse', [
      fadeInHeightExpandTransition({
        duration: '0.2s',
        reverse: true
      })
    ])
  ]),
  cB('tree-node-wrapper', `
    box-sizing: border-box;
    padding: var(--n-node-wrapper-padding);
  `),
  cB('tree-node', `
    transform: translate3d(0,0,0);
    position: relative;
    display: flex;
    border-radius: var(--n-node-border-radius);
    transition: background-color .3s var(--n-bezier);
  `, [
    cM('highlight', [
      cB('tree-node-content', [
        cE('text', 'border-bottom-color: var(--n-node-text-color-disabled);')
      ])
    ]),
    cM('disabled', [
      cB('tree-node-content', `
        color: var(--n-node-text-color-disabled);
        cursor: not-allowed;
      `)
    ]),
    cNotM('disabled', [
      cM('clickable', [
        cB('tree-node-content', `
          cursor: pointer;
        `)
      ])
    ])
  ]),
  cM('block-node', [
    cB('tree-node-content', `
      flex: 1;
      min-width: 0;
    `)
  ]),
  cNotM('block-line', [
    cB('tree-node', [
      cNotM('disabled', [
        cB('tree-node-content', [
          c('&:hover', 'background: var(--n-node-color-hover);')
        ]),
        cM('selectable', [
          cB('tree-node-content', [
            c('&:active', 'background: var(--n-node-color-pressed);')
          ])
        ]),
        cM('pending', [
          cB('tree-node-content', `
            background: var(--n-node-color-hover);
          `)
        ]),
        cM('selected', [
          cB('tree-node-content', 'background: var(--n-node-color-active);')
        ])
      ]),
      cM('selected', [
        cB('tree-node-content', 'background: var(--n-node-color-active);')
      ])
    ])
  ]),
  cM('block-line', [
    cB('tree-node', [
      cNotM('disabled', [
        c('&:hover', 'background: var(--n-node-color-hover);'),
        cM('pending', `
          background: var(--n-node-color-hover);
        `),
        cM('selectable', [
          cNotM('selected', [
            c('&:active', 'background: var(--n-node-color-pressed);')
          ])
        ]),
        cM('selected', 'background: var(--n-node-color-active);')
      ]),
      cM('selected', 'background: var(--n-node-color-active);'),
      cM('disabled', `
        cursor: not-allowed;
      `)
    ])
  ]),
  cB('tree-node-indent', `
    flex-grow: 0;
    flex-shrink: 0;
  `, [
    cM('show-line', 'position: relative', [
      c('&::before', `
        position: absolute;
        left: 50%;
        border-left: 1px solid var(--n-line-color);
        transition: border-color .3s var(--n-bezier);
        transform: translate(-50%);
        content: "";
        top: var(--n-line-offset-top);
        bottom: var(--n-line-offset-bottom);
      `),
      cM('last-child', [
        c('&::before', `
          bottom: 50%;
        `)
      ]),
      cM('is-leaf', [
        c('&::after', `
          position: absolute;
          content: "";
          left: calc(50% + 0.5px);
          right: 0;
          bottom: 50%;
          transition: border-color .3s var(--n-bezier);
          border-bottom: 1px solid var(--n-line-color);
        `)
      ])
    ]),
    cNotM('show-line', 'height: 0;')
  ]),
  cB('tree-node-switcher', `
    cursor: pointer;
    display: inline-flex;
    flex-shrink: 0;
    height: var(--n-node-content-height);
    align-items: center;
    justify-content: center;
    transition: transform .15s var(--n-bezier);
    vertical-align: bottom;
  `, [
    cE('icon', `
      position: relative;
      height: 14px;
      width: 14px;
      display: flex;
      color: var(--n-arrow-color);
      transition: color .3s var(--n-bezier);
      font-size: 14px;
    `, [
      cB('icon', [
        iconSwitchTransitionNode
      ]),
      cB('base-loading', `
        color: var(--n-loading-color);
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
      `, [
        iconSwitchTransitionNode
      ]),
      cB('base-icon', [
        iconSwitchTransitionNode
      ])
    ]),
    cM('hide', 'visibility: hidden;'),
    cM('expanded', 'transform: rotate(90deg);')
  ]),
  cB('tree-node-checkbox', `
    display: inline-flex;
    height: var(--n-node-content-height);
    vertical-align: bottom;
    align-items: center;
    justify-content: center;
  `),
  cB('tree-node-content', `
    user-select: none;
    position: relative;
    display: inline-flex;
    align-items: center;
    min-height: var(--n-node-content-height);
    box-sizing: border-box;
    line-height: var(--n-line-height);
    vertical-align: bottom;
    padding: 0 6px 0 4px;
    cursor: default;
    border-radius: var(--n-node-border-radius);
    color: var(--n-node-text-color);
    transition:
      color .3s var(--n-bezier),
      background-color .3s var(--n-bezier),
      border-color .3s var(--n-bezier);
  `, [
    c('&:last-child', 'margin-bottom: 0;'),
    cE('prefix', `
      display: inline-flex;
      margin-right: 8px;
    `),
    cE('text', `
      border-bottom: 1px solid #0000;
      transition: border-color .3s var(--n-bezier);
      flex-grow: 1;
      max-width: 100%;
    `),
    cE('suffix', `
      display: inline-flex;
    `)
  ]),
  cE('empty', 'margin: auto;')
])
