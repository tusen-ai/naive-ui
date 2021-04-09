import { c, cB, cE, cM } from '../../../_utils/cssr'
import fadeInHeightExpandTranstion from '../../../_styles/transitions/fade-in-height-expand.cssr'

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
// --icon-size
// --icon-margin
// --close-size
// --close-margin
// --padding
// --icon-margin-left
// --icon-margin-right
export default cB('alert', `
  line-height: var(--line-height);
  border-radius: var(--border-radius);
  position: relative;
  transition: background-color .3s var(--bezier);
  background-color: var(--color);
  text-align: start;
`, [
  cE('icon', {
    color: 'var(--icon-color)'
  }),
  cB('alert-body', {
    border: 'var(--border)',
    padding: 'var(--padding)'
  }, [
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
  cE('icon', `
    position: absolute;
    left: 0;
    top: 0;
    align-items: center;
    justify-content: center;
    display: flex;
    width: var(--icon-size);
    height: var(--icon-size);
    font-size: var(--icon-size);
    margin: var(--icon-margin);
  `),
  cE('close', `
    transition: color .3s var(--bezier);
    position: absolute;
    right: 0;
    top: 0;
    margin: var(--close-margin);
    font-size: var(--close-size);
  `),
  cM('show-icon', [
    cB('alert-body', {
      paddingLeft: 'calc(var(--icon-margin-left) + var(--icon-size) + var(--icon-margin-right))'
    })
  ]),
  cB('alert-body', `
    border-radius: var(--border-radius);
    transition: border-color .3s var(--bezier);
  `, [
    cE('title', `
      transition: color .3s var(--bezier);
      font-size: 16px;
      line-height: 19px;
      font-weight: var(--title-font-weight);
    `, [
      c('& +', [
        cE('content', {
          marginTop: '9px'
        })
      ])
    ]),
    cE('content', {
      transition: 'color .3s var(--bezier)',
      fontSize: 'var(--font-size)'
    })
  ]),
  cE('icon', {
    transition: 'color .3s var(--bezier)'
  })
])
