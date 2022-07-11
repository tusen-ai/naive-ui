import { c, cB, cM } from '../../../_utils/cssr'

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
// --n-padding-color
// --n-line-number-color
// --n-line-number-length
// --n-line-number-padding-left

export default c([
  cB('code', `
    font-size: var(--n-font-size);
    font-family: var(--n-font-family);
  `, [
    cM('word-wrap', [
      c('pre', `
        white-space: pre-wrap;
        word-break: break-all;
      `)
    ]),
    c('pre', `
      margin: 0;
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
      }`,
      // 行号显示
      `.hljsln {
        position: relative;
        display: block;
        padding-left: var(--n-line-number-padding-left) !important;
      }`,
      `.hljsln::-webkit-scrollbar {
        height: 15px;
      }`,
      `.hljsln::-webkit-scrollbar-thumb {
        background: #666;
      }`,
      `.hljsln::-webkit-scrollbar-thumb:hover {
        background: #797979;
      }`,
      `.hljsln::-webkit-scrollbar-thumb:active {
        background: #949494;
      }`,
      `.hljsln .ln-bg {
        position: absolute;
        z-index: 1;
        top: 0;
        left: 0;
        width: var(--n-line-number-length);
        height: 100%;
        background: var(--n-padding-color);
      }`,
      `.hljsln .ln-num {
        position: absolute;
        z-index: 2;
        left: 0;
        width: var(--n-line-number-length);
        /* height: var(--n-font-size); */
        height: auto;
        text-align: center;
        display: inline-block;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }`,
      `.hljsln .ln-num::before {
        color: var(--n-line-number-color);
        font-style: normal;
        font-weight: normal;
        font-size: var(--n-font-size);
        height: auto; 
        content: attr(data-num);
      }`,
      `.hljsln .ln-eof {
        display: inline-block;
      }`
    ]
  }
])
