import { c, cB, cM } from '../../../_utils/cssr'

// vars:
// --bezier
// --font-size
// --margin
// --bar-color
// --bar-width
// --font-weight
// --text-color
// --prefix-width
export default cB('h', `
  font-size: var(--font-size);
  font-weight: var(--font-weight);
  margin: var(--margin);
  transition: color .3s var(--bezier);
  color: var(--text-color);
`, [
  c('&:first-child', {
    marginTop: 0
  }),
  cM('prefix-bar', {
    position: 'relative',
    paddingLeft: 'var(--prefix-width)'
  }, [
    cM('align-text', {
      paddingLeft: 0
    }, [
      c('&::before', {
        left: 'calc(-1 * var(--prefix-width))'
      })
    ]),
    c('&::before', `
      content: "";
      width: var(--bar-width);
      border-radius: calc(var(--bar-width) / 2);
      transition: background-color .3s var(--bezier);
      left: 0;
      top: 0;
      bottom: 0;
      position: absolute;
    `),
    c('&::before', {
      backgroundColor: 'var(--bar-color)'
    })
  ])
])
