import { c, cB, cE, cM } from '../../../_utils/cssr'

// vars:
// --n-font-size
// --n-font-family
// --n-font-weight-strong
// --n-bezier
// --n-text-color
// --n-mono-3
// --n-hue-1
// --n-hue-2
// --n-hue-3
// --n-hue-4
// --n-hue-5
// --n-hue-5-2
// --n-hue-6
// --n-hue-6-2
// --n-line-number-color
// --n-line-number-text-color
export default c([
  cB('code', `
    font-size: var(--n-font-size);
    font-family: var(--n-font-family);
  `, [
    cM('show-line-numbers', `
      display: flex;
    `),
    cE('line-numbers', `
      user-select: none;
      padding-right: 12px;
      text-align: right;
      transition: color .3s var(--n-bezier);
      color: var(--n-line-number-text-color);
    `),
    cM('word-wrap', [
      c('pre', `
        white-space: pre-wrap;
        word-break: break-all;
      `)
    ]),
    c('pre', `
      margin: 0;
      line-height: inherit;
      font-size: inherit;
      font-family: inherit;
    `),
    c('[class^=hljs]', `
      color: var(--n-text-color);
      transition: 
        color .3s var(--n-bezier),
        background-color .3s var(--n-bezier);
    `)
  ]), ({ props }) => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const codeClass = `${props.bPrefix}code`
    return [
      `${codeClass} .hljs-comment,
      ${codeClass} .hljs-quote {
        color: var(--n-mono-3);
        font-style: italic;
      }`,
      `${codeClass} .hljs-doctag,
      ${codeClass} .hljs-keyword,
      ${codeClass} .hljs-formula {
        color: var(--n-hue-3);
      }`,
      `${codeClass} .hljs-section,
      ${codeClass} .hljs-name,
      ${codeClass} .hljs-selector-tag,
      ${codeClass} .hljs-deletion,
      ${codeClass} .hljs-subst {
        color: var(--n-hue-5);
      }`,
      `${codeClass} .hljs-literal {
        color: var(--n-hue-1);
      }`,
      `${codeClass} .hljs-string,
      ${codeClass} .hljs-regexp,
      ${codeClass} .hljs-addition,
      ${codeClass} .hljs-attribute,
      ${codeClass} .hljs-meta-string {
        color: var(--n-hue-4);
      }`,
      `${codeClass} .hljs-built_in,
      ${codeClass} .hljs-class .hljs-title {
        color: var(--n-hue-6-2);
      }`,
      `${codeClass} .hljs-attr,
      ${codeClass} .hljs-variable,
      ${codeClass} .hljs-template-variable,
      ${codeClass} .hljs-type,
      ${codeClass} .hljs-selector-class,
      ${codeClass} .hljs-selector-attr,
      ${codeClass} .hljs-selector-pseudo,
      ${codeClass} .hljs-number {
        color: var(--n-hue-6);
      }`,
      `${codeClass} .hljs-symbol,
      ${codeClass} .hljs-bullet,
      ${codeClass} .hljs-link,
      ${codeClass} .hljs-meta,
      ${codeClass} .hljs-selector-id,
      ${codeClass} .hljs-title {
        color: var(--n-hue-2);
      }`,
      `${codeClass} .hljs-emphasis {
        font-style: italic;
      }`,
      `${codeClass} .hljs-strong {
        font-weight: var(--n-font-weight-strong);
      }`,
      `${codeClass} .hljs-link {
        text-decoration: underline;
      }`
    ]
  }
])
