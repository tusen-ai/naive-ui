import { c, cB, cE, cM, cNotM } from '../../../../_utils/cssr'
import fadeInScaleUpTransition from '../../../../_styles/transitions/fade-in-scale-up.cssr'

// --n-loading-color
// --n-loading-size
export default cB('base-select-menu', `
  line-height: 1.5;
  outline: none;
  z-index: 0;
  position: relative;
  border-radius: var(--n-border-radius);
  transition:
    background-color .3s var(--n-bezier),
    box-shadow .3s var(--n-bezier);
  background-color: var(--n-color);
`, [
  cM('multiple', [
    cB('base-select-option', `
      padding-right: 28px;
    `)
  ]),
  cB('scrollbar', `
    max-height: var(--n-height);
  `),
  cB('virtual-list', `
    max-height: var(--n-height);
  `),
  cB('base-select-option', `
    min-height: var(--n-option-height);
    font-size: var(--n-option-font-size);
    display: flex;
    align-items: center;
  `, [
    cE('content', `
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    `)
  ]),
  cB('base-select-group-header', `
    min-height: var(--n-option-height);
    font-size: .93em;
    display: flex;
    align-items: center;
  `),
  cB('base-select-menu-option-wrapper', `
    position: relative;
    width: 100%;
  `),
  cE('loading, empty', `
    display: flex;
    padding: 12px 32px;
    flex: 1;
    justify-content: center;
  `),
  cE('loading', `
    color: var(--n-loading-color);
    font-size: var(--n-loading-size);
  `),
  cE('action', `
    padding: 8px var(--n-option-padding-left);
    font-size: var(--n-option-font-size);
    transition: 
      color .3s var(--n-bezier);
      border-color .3s var(--n-bezier);
    border-top: 1px solid var(--n-action-divider-color);
    color: var(--n-action-text-color);
  `),
  cB('base-select-group-header', `
    position: relative;
    cursor: default;
    padding: var(--n-option-padding);
    color: var(--n-group-header-text-color);
  `),
  cB('base-select-option', `
    cursor: pointer;
    position: relative;
    padding: var(--n-option-padding);
    transition:
      background-color .3s var(--n-bezier),
      color .3s var(--n-bezier),
      opacity .3s var(--n-bezier);
    box-sizing: border-box;
    color: var(--n-option-text-color);
    opacity: 1;
  `, [
    c('&:active', `
      color: var(--n-option-text-color-pressed);
    `),
    cM('grouped', `
      padding-left: calc(var(--n-option-padding-left) * 1.5);
    `),
    cM('pending', `
      background-color: var(--n-option-color-pending);
    `),
    cM('selected', `
      color: var(--n-option-text-color-active);
      background-color: var(--n-option-color-active);
    `),
    cM('disabled', `
      cursor: not-allowed;
    `, [
      cNotM('selected', `
        color: var(--n-option-text-color-disabled);
      `),
      cM('selected', `
        opacity: var(--n-option-opacity-disabled);
      `)
    ]),
    cE('check', `
      font-size: 16px;
      position: absolute;
      right: 8px;
      top: calc(50% - 7px);
      color: var(--n-option-check-color);
      transition: color .3s var(--n-bezier);
    `, [
      fadeInScaleUpTransition({
        enterScale: '0.5'
      })
    ])
  ])
])
