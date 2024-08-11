import { c, cB, cE, cM } from '../../../_utils/cssr'
import { fadeInScaleUpTransition } from '../../../_styles/transitions/fade-in-scale-up.cssr'

// vars:
// --n-menu-border-radius
// --n-menu-box-shadow
// --n-menu-height
// --n-menu-color
// --n-menu-divider-color
// --n-option-height
// --n-option-font-size
// --n-option-text-color
// --n-option-text-color-disabled
// --n-option-text-color-active
// --n-option-color-hover
// --n-option-check-mark-color
// --n-option-arrow-color
// --n-menu-mask-color
// --n-loading-color
export default c([
  cB('cascader-menu', `
    outline: none;
    position: relative;
    margin: 4px 0;
    display: flex;
    flex-flow: column nowrap;
    border-radius: var(--n-menu-border-radius);
    overflow: hidden;
    box-shadow: var(--n-menu-box-shadow);
    color: var(--n-option-text-color);
    background-color: var(--n-menu-color);
  `, [
    fadeInScaleUpTransition({ transformOrigin: 'inherit', duration: '0.2s' }),
    cE('empty', `
      display: flex;
      padding: 12px 32px;
      flex: 1;
      justify-content: center;
    `),
    // if width not set, cascader select menu's inner scroll area's width is
    // not correct, which won't change after select menu width is set
    cB('scrollbar', `
      width: 100%;
    `),
    cB('base-menu-mask', `
      background-color: var(--n-menu-mask-color);
    `),
    cB('base-loading', `
      color: var(--n-loading-color);
    `),
    cB('cascader-submenu-wrapper', `
      position: relative;
      display: flex;
      flex-wrap: nowrap;
    `),
    cB('cascader-submenu', `
      height: var(--n-menu-height);
      min-width: var(--n-column-width);
      position: relative;
    `, [
      cM('virtual', `
        width: var(--n-column-width);
      `),
      cB('scrollbar-content', `
        position: relative;
      `),
      c('&:first-child', `
        border-top-left-radius: var(--n-menu-border-radius);
        border-bottom-left-radius: var(--n-menu-border-radius);
      `),
      c('&:last-child', `
        border-top-right-radius: var(--n-menu-border-radius);
        border-bottom-right-radius: var(--n-menu-border-radius);
      `),
      c('&:not(:first-child)', `
        border-left: 1px solid var(--n-menu-divider-color);
      `)
    ]),
    cB('cascader-menu-action', `
      box-sizing: border-box;
      padding: 8px;
      border-top: 1px solid var(--n-menu-divider-color);
    `),
    cB('cascader-option', `
      height: var(--n-option-height);
      line-height: var(--n-option-height);
      font-size: var(--n-option-font-size);
      padding: 0 0 0 18px;
      box-sizing: border-box;
      min-width: 182px;
      background-color: #0000;
      display: flex;
      align-items: center;
      white-space: nowrap;
      position: relative;
      cursor: pointer;
      transition:
        background-color .2s var(--n-bezier),
        color 0.2s var(--n-bezier);
    `, [
      cM('show-prefix', `
        padding-left: 0;
      `),
      cE('label', `
        flex: 1 0 0;
        overflow: hidden;
        text-overflow: ellipsis;
      `),
      cE('prefix', `
        min-width: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
      `),
      cE('suffix', `
        min-width: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
      `),
      cB('cascader-option-icon-placeholder', `
        line-height: 0;
        position: relative;
        width: 16px;
        height: 16px;
        font-size: 16px;
      `, [
        cB('cascader-option-icon', [
          cM('checkmark', `
            color: var(--n-option-check-mark-color);
          `, [
            fadeInScaleUpTransition({
              originalTransition: 'background-color .3s var(--n-bezier), box-shadow .3s var(--n-bezier)'
            })
          ]),
          cM('arrow', `
            color: var(--n-option-arrow-color);
          `)
        ])
      ]),
      cM('selected', `
        color: var(--n-option-text-color-active);
      `),
      cM('active', `
        color: var(--n-option-text-color-active);
        background-color: var(--n-option-color-hover);
      `),
      cM('pending', `
        background-color: var(--n-option-color-hover);
      `),
      c('&:hover', `
        background-color: var(--n-option-color-hover);
      `),
      cM('disabled', `
        color: var(--n-option-text-color-disabled);
        background-color: #0000;
        cursor: not-allowed;
      `, [
        cB('cascader-option-icon', [
          cM('arrow', `
            color: var(--n-option-text-color-disabled);
          `)
        ])
      ])
    ])
  ]),
  cB('cascader', `
    z-index: auto;
    position: relative;
    width: 100%;
  `)
])
