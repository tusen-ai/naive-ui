import { c, cB, cM } from '../../../_utils/cssr'

const liStyle = c('li', {
  transition: 'color .3s var(--bezier)',
  lineHeight: 'var(--line-height)',
  margin: 'var(--li-margin)',
  marginBottom: 0,
  color: 'var(--text-color)'
})

const childStyle = [
  c('&:first-child', `
    margin-top: 0;
  `),
  c('&:last-child', `
    margin-bottom: 0;
  `)
]

// vars:
// --bezier
// --font-size
// --line-height
// --text-color
// --li-margin
// --ol-padding
// --ul-padding
export default c([
  cB('ol', {
    fontSize: 'var(--font-size)',
    padding: 'var(--ol-padding)'
  }, [
    cM('align-text', {
      paddingLeft: 0
    }),
    liStyle,
    childStyle
  ]),
  cB('ul', {
    fontSize: 'var(--font-size)',
    padding: 'var(--ul-padding)'
  }, [
    cM('align-text', {
      paddingLeft: 0
    }),
    liStyle,
    childStyle
  ])
])
