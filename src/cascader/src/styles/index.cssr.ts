import { c, cB, cE, cM } from '../../../_utils/cssr'
import fadeInScaleUpTransition from '../../../_styles/transitions/fade-in-scale-up.cssr'

// vars:
// --menu-border-radius
// --menu-box-shadow
// --menu-height
// --menu-color
// --menu-divider-color
// --option-height
// --option-font-size
// --option-text-color
// --option-text-color-disabled
// --option-text-color-active
// --option-color-hover
// --option-check-mark-color
// --option-arrow-color
// --menu-mask-color
// --loading-color
export default c([
  cB('cascader-menu', `
    outline: none;
    position: relative;
    margin: 4px 0;
    display: flex;
    flex-flow: column nowrap;
    border-radius: var(--menu-border-radius);
    overflow: hidden;
    box-shadow: var(--menu-box-shadow);
    color: var(--option-text-color);
    background-color: var(--menu-color);
  `, [
    fadeInScaleUpTransition({ transformOrigin: 'inherit', duration: '0.2s' }),
    cB('scrollbar', {
      // if width not set, cascader select menu's inner scroll area's width is
      // not correct, which won't change after select menu width is set
      width: '100%'
    }),
    cB('base-menu-mask', {
      backgroundColor: 'var(--menu-mask-color)'
    }),
    cB('base-loading', {
      color: 'var(--loading-color)'
    }),
    cB('cascader-submenu-wrapper', `
      position: relative;
      display: flex;
      flex-wrap: nowrap;
    `),
    cB('cascader-submenu', `
      height: var(--menu-height);
      position: relative;
      min-width: 180px;
    `, [
      cB('scrollbar-content', {
        position: 'relative'
      }),
      c('&:first-child', `
        border-top-left-radius: var(--menu-border-radius);
        border-bottom-left-radius: var(--menu-border-radius);
      `),
      c('&:last-child', `
        border-top-right-radius: var(--menu-border-radius);
        border-bottom-right-radius: var(--menu-border-radius);
      `),
      c('&:not(:first-child)', `
        border-left: 1px solid var(--menu-divider-color);
      `)
    ]),
    cB('cascader-menu-action', `
      box-sizing: border-box;
      padding: 8px;
      border-top: 1px solid var(--menu-divider-color);
    `),
    cB('cascader-option', `
      height: var(--option-height);
      line-height: var(--option-height);
      font-size: var(--option-font-size);
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
        background-color .2s var(--bezier),
        color 0.2s var(--bezier);
    `, [
      cM('show-prefix', {
        paddingLeft: 0
      }),
      cE('label', `
        flex: 1 0 0;
        overflow: hidden;
        text-overflow: ellipsis;
      `),
      cE('prefix', {
        width: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }),
      cE('suffix', {
        width: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }),
      cB('cascader-option-icon-placeholder', {
        lineHeight: 0,
        position: 'relative',
        width: '16px',
        height: '16px',
        fontSize: '16px'
      }, [
        cB('cascader-option-icon', [
          cM('checkmark', {
            color: 'var(--option-check-mark-color)'
          }, [
            fadeInScaleUpTransition()
          ]),
          cM('arrow', {
            color: 'var(--option-arrow-color)'
          })
        ])
      ]),
      cM('selected', {
        color: 'var(--option-text-color-active)'
      }),
      cM('active', {
        color: 'var(--option-text-color-active)',
        backgroundColor: 'var(--option-color-hover)'
      }),
      cM('pending', {
        backgroundColor: 'var(--option-color-hover)'
      }),
      c('&:hover', {
        backgroundColor: 'var(--option-color-hover)'
      }),
      cM('disabled', `
        color: var(--option-text-color-disabled);
        background-color: #0000;
        cursor: not-allowed;
      `, [
        cB('cascader-option-icon', [
          cM('arrow', {
            color: 'var(--option-text-color-disabled)'
          })
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
