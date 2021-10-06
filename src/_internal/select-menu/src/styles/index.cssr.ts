import { c, cB, cE, cM, cNotM } from '../../../../_utils/cssr'
import fadeInScaleUpTransition from '../../../../_styles/transitions/fade-in-scale-up.cssr'

// --loading-color
// --loading-size
export default cB('base-select-menu', `
  line-height: 1.5;
  outline: none;
  z-index: 0;
  position: relative;
  border-radius: var(--border-radius);
  transition:
    background-color .3s var(--bezier),
    box-shadow .3s var(--bezier);
  background-color: var(--color);
`, [
  cM('multiple', [
    cB('base-select-option', `
      padding-right: 28px;
    `)
  ]),
  cB('scrollbar', `
    max-height: var(--height);
  `),
  cB('virtual-list', `
    max-height: var(--height);
  `),
  cB('base-select-option', `
    min-height: var(--option-height);
    font-size: var(--option-font-size);
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
    min-height: var(--option-height);
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
    color: var(--loading-color);
    font-size: var(--loading-size);
  `),
  cE('action', `
    padding: 8px var(--option-padding-left);
    font-size: var(--option-font-size);
    transition: 
      color .3s var(--bezier);
      border-color .3s var(--bezier);
    border-top: 1px solid var(--action-divider-color);
    color: var(--action-text-color);
  `),
  cB('base-select-group-header', `
    position: relative;
    cursor: default;
    padding: var(--option-padding);
    color: var(--group-header-text-color);
  `),
  cB('base-select-option', `
    cursor: pointer;
    position: relative;
    padding: var(--option-padding);
    transition:
      background-color .3s var(--bezier),
      color .3s var(--bezier),
      opacity .3s var(--bezier);
    box-sizing: border-box;
    color: var(--option-text-color);
    opacity: 1;
  `, [
    c('&:active', `
      color: var(--option-text-color-pressed);
    `),
    cM('grouped', `
      padding-left: calc(var(--option-padding-left) * 1.5);
    `),
    cM('pending', `
      background-color: var(--option-color-pending);
    `),
    cM('selected', `
      color: var(--option-text-color-active);
      background-color: var(--option-color-active);
    `),
    cM('disabled', `
      cursor: not-allowed;
    `, [
      cNotM('selected', `
        color: var(--option-text-color-disabled);
      `),
      cM('selected', `
        opacity: var(--option-opacity-disabled);
      `)
    ]),
    cE('check', `
      font-size: 16px;
      position: absolute;
      right: 8px;
      top: calc(50% - 7px);
      color: var(--option-check-color);
      transition: color .3s var(--bezier);
    `, [
      fadeInScaleUpTransition({
        enterScale: '0.5'
      })
    ])
  ])
])
