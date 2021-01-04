import { c, cB, cM } from '../../../_utils/cssr'

// vars:
// --bezier
// --color
// --opacity
export default cB('icon', `
  height: 1em;
  width: 1em;
  line-height: 1em;
  text-align: center;
  display: inline-block;
  position: relative;
  fill: currentColor;
`,
[
  cM('color-transition', {
    transition: 'color .3s var(--bezier)'
  }),
  cM('depth', {
    color: 'var(--color)'
  }, [
    c('svg', {
      opacity: 'var(--opacity)',
      transition: 'opacity .3s var(--bezier)'
    })
  ]),
  c('svg', {
    height: '1em',
    width: '1em'
  })
])
