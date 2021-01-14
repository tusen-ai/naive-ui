import { c, cB, cE, cM } from '../../../_utils/cssr'
import fadeInHeightExpandTranstion from '../../../_styles/transitions/fade-in-height-expand'

// vars:
// --bezier
// --color
// --close-color
// --close-color-hover
// --close-color-pressed
// --icon-color
// --border
// --title-text-color
// --content-text-color
// --line-height
// --border-radius
// --font-size
// --title-font-weight
export default cB(
  'alert',
  `
  line-height: var(--line-height);
  border-radius: var(--border-radius);
  position: relative;
  transition: background-color .3s var(--bezier);
  background-color: var(--color);
  text-align: start;
`,
  [
    cE('icon', {
      color: 'var(--icon-color)'
    }),
    cB(
      'alert-body',
      {
        border: 'var(--border)'
      },
      [
        cE('title', {
          color: 'var(--title-text-color)'
        }),
        cE('content', {
          color: 'var(--content-text-color)'
        })
      ]
    ),
    fadeInHeightExpandTranstion({
      originalTransition: 'transform .3s var(--bezier)',
      enterToProps: {
        transform: 'scale(1)'
      },
      leaveToProps: {
        transform: 'scale(0.9)'
      }
    }),
    cE(
      'icon',
      `
    position: absolute;
    left: 12px;
    top: 14px;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
    font-size: 26px;
  `
    ),
    cE(
      'close',
      `
    transition: color .3s var(--bezier);
    position: absolute;
    right: 16px;
    font-size: 14px;
    top: 14px;
  `
    ),
    cB(
      'alert-body',
      `
    border-radius: var(--border-radius);
    padding: 15px 15px 15px 47px;
    transition: border-color .3s var(--bezier);
  `,
      [
        cE(
          'title',
          `
      transition: color .3s var(--bezier);
      font-size: 16px;
      line-height: 19px;
      font-weight: var(--title-font-weight);
    `,
          [
            c('& +', [
              cE('content', {
                marginTop: '9px'
              })
            ])
          ]
        ),
        cE('content', {
          transition: 'color .3s var(--bezier)',
          fontSize: 'var(--font-size)'
        })
      ]
    ),
    cE('icon', {
      transition: 'color .3s var(--bezier)'
    }),
    cM('no-icon', [
      cB('alert-body', {
        paddingLeft: '19px'
      })
    ])
  ]
)
