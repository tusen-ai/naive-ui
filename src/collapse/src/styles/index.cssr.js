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
export default cB('collapse',
  {
    width: '100%'
  },
  [
    cB('collapse-item', `
      overflow: hidden;
      font-size: var(--font-size);
      transition: border-color .3s var(--bezier);
      margin-top: 16px;
    `,
    [
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
      cB('collapse-item', {
        marginLeft: '32px'
      }),
      cE('content-wrapper', {
        overflow: 'hidden'
      }, [
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
        cB('collapse-item-arrow', {
          display: 'flex',
          transition: 'transform .15s var(--bezier)'
        }, [
          cB('icon', `
            font-size: 18px;
            color: var(--arrow-color);
          `)
        ])
      ]),
      cE('content-inner', `
        transition: color .3s var(--bezier);
        padding-top: 16px;
        color: var(--text-color);
      `)
    ])
  ]
)
