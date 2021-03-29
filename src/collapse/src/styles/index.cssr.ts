import { c, cB, cE, cM } from '../../../_utils/cssr'
import fadeInHeightExpandTransition from '../../../_styles/transitions/fade-in-height-expand'

// vars:
// --font-size
// --bezier
// --text-color
// --divider-color
// --title-font-size
// --title-text-color
// --title-font-weight
// --arrow-color
export default cB('collapse', {
  width: '100%'
}, [
  cB('collapse-item', `
    font-size: var(--font-size);
    color: var(--text-color);
    transition:
      color .3s var(--bezier),
      border-color .3s var(--bezier);
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
      borderTop: '1px solid var(--divider-color)'
    }),
    cE('header', `
      font-size: var(--title-font-size);
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      font-weight: var(--title-font-weight);
      transition: color .3s var(--bezier);
      position: relative;
      cursor: pointer;
      padding: 16px 0 0 0;
      color: var(--title-text-color);
    `, [
      cB('collapse-item-arrow', `
        display: flex;
        transition:
          transform .15s var(--bezier),
          color .3s var(--bezier);
        font-size: 18px;
        color: var(--arrow-color);
      `)
    ])
  ])
])
