import { c, cB, cE, cM } from '../../../_utils/cssr'
import { fadeInHeightExpandTransition } from '../../../_styles/transitions/fade-in-height-expand.cssr'

// vars:
// --n-font-size
// --n-bezier
// --n-text-color
// --n-divider-color
// --n-title-padding
// --n-title-font-size
// --n-title-text-color
// --n-title-font-weight
// --n-arrow-color
// --n-arrow-color-disabled
// --n-title-text-color-disabled
// --n-item-margin
export default cB('collapse', 'width: 100%;', [
  cB('collapse-item', `
    font-size: var(--n-font-size);
    color: var(--n-text-color);
    transition:
      color .3s var(--n-bezier),
      border-color .3s var(--n-bezier);
    margin: var(--n-item-margin);
  `, [
    cM('disabled', [
      cE('header', 'cursor: not-allowed;', [
        cE('header-main', `
          color: var(--n-title-text-color-disabled);
        `),
        cB('collapse-item-arrow', `
          color: var(--n-arrow-color-disabled);
        `)
      ])
    ]),
    cB('collapse-item', 'margin-left: 32px;'),
    c('&:first-child', 'margin-top: 0;'),
    c('&:first-child >', [
      cE('header', 'padding-top: 0;')
    ]),
    cM('left-arrow-placement', [
      cE('header', [
        cB('collapse-item-arrow', 'margin-right: 4px;')
      ])
    ]),
    cM('right-arrow-placement', [
      cE('header', [
        cB('collapse-item-arrow', 'margin-left: 4px;')
      ])
    ]),
    cE('content-wrapper', [
      cE('content-inner', 'padding-top: 16px;'),
      fadeInHeightExpandTransition({ duration: '0.15s' })
    ]),
    cM('active', [
      cE('header', [
        cM('active', [
          cB('collapse-item-arrow', 'transform: rotate(90deg);')
        ])
      ])
    ]),
    c('&:not(:first-child)', 'border-top: 1px solid var(--n-divider-color);'),
    cE('header', `
      font-size: var(--n-title-font-size);
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      transition: color .3s var(--n-bezier);
      position: relative;
      padding: var(--n-title-padding);
      color: var(--n-title-text-color);
      cursor: pointer;
    `, [
      cE('header-main', `
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        font-weight: var(--n-title-font-weight);
        transition: color .3s var(--n-bezier);
        flex: 1;
        color: var(--n-title-text-color);
      `),
      cE('header-extra', `
        display: flex;
        align-items: center;
        transition: color .3s var(--n-bezier);
        color: var(--n-text-color);
      `),
      cB('collapse-item-arrow', `
        display: flex;
        transition:
          transform .15s var(--n-bezier),
          color .3s var(--n-bezier);
        font-size: 18px;
        color: var(--n-arrow-color);
      `)
    ])
  ])
])
