import { c, cB, cE, cM } from '../../../_utils/cssr'
import fadeInHeightExpandTransition from '../../../_styles/transitions/fade-in-height-expand.cssr'

// vars:
// --n-font-size
// --n-bezier
// --n-text-color
// --n-divider-color
// --n-title-font-size
// --n-title-text-color
// --n-title-font-weight
// --n-arrow-color
export default cB('collapse', {
  width: '100%'
}, [
  cB('collapse-item', `
    font-size: var(--n-font-size);
    color: var(--n-text-color);
    transition:
      color .3s var(--n-bezier),
      border-color .3s var(--n-bezier);
    margin: 16px 0 0 0;
  `, [
    cB('collapse-item', 'margin-left: 32px;'),
    c('&:first-child', {
      marginTop: 0
    }),
    c('&:first-child >', [
      cE('header', {
        paddingTop: 0
      })
    ]),
    cM('left-arrow-placement', [
      cE('header', [
        cB('collapse-item-arrow', {
          marginRight: '4px'
        })
      ])
    ]),
    cM('right-arrow-placement', [
      cE('header', [
        cB('collapse-item-arrow', {
          marginLeft: '4px'
        })
      ])
    ]),
    cE('content-wrapper', [
      cE('content-inner', {
        paddingTop: '16px'
      }),
      fadeInHeightExpandTransition({ duration: '0.15s' })
    ]),
    cM('active', [
      cE('header', [
        cM('active', [
          cB('collapse-item-arrow', {
            transform: 'rotate(90deg)'
          })
        ])
      ])
    ]),
    c('&:not(:first-child)', {
      borderTop: '1px solid var(--n-divider-color)'
    }),
    cE('header', `
      font-size: var(--n-title-font-size);
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      transition: color .3s var(--n-bezier);
      position: relative;
      padding: 16px 0 0 0;
      color: var(--n-title-text-color);
    `, [
      cE('header-main', `
        cursor: pointer;
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        font-weight: var(--n-title-font-weight);
        transition: color .3s var(--n-bezier);
        flex: 1;
        color: var(--n-title-text-color);
      `),
      cE('header-extra', `
        cursor: pointer;
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
