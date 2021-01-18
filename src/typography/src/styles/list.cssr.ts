import { c, cB, cM } from '../../../_utils/cssr'

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
    })
  ]),
  cB('ul', {
    fontSize: 'var(--font-size)',
    padding: 'var(--ul-padding)'
  }, [
    cM('align-text', {
      paddingLeft: 0
    })
  ]),
  cB('li', {
    transition: 'color .3s var(--bezier)',
    lineHeight: 'var(--line-height)',
    margin: 'var(--li-margin)',
    marginBottom: 0,
    color: 'var(--text-color)'
  })
])
