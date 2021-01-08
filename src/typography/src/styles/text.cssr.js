import { cB, cM } from '../../../_utils/cssr'

// vars:
// --text-color
// --font-weight-strong
// --font-famliy-mono
// --code-border-radius
// --code-text-color
// --code-color
// --code-border
export default cB('text', `
  transition: color .3s var(--bezier);
  color: var(--text-color);
`, [
  cM('strong', `
    font-weight: var(--font-weight-strong);
  `),
  cM('italic', {
    fontStyle: 'italic'
  }),
  cM('underline', {
    textDecoration: 'underline'
  }),
  cM('code', `
    line-height: 1.4;
    display: inline-block;
    font-family: var(--font-famliy-mono);
    transition: 
      color .3s var(--bezier),
      border-color .3s var(--bezier),
      background-color .3s var(--bezier);
    box-sizing: border-box;
    padding: .15em .45em 0 .45em;
    border-radius: var(--code-border-radius);
    font-size: .9em;
    color: var(code-text-color);
    background-color: var(--code-color);
    border: var(--code-border);
  `)
])
