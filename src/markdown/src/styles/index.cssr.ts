import { c, cB, cCB } from '../../../_utils/cssr'

export default c([
  cB('markdown', `
    line-height: var(--n-line-height);
    font-size: var(--n-font-size);
    color: var(--n-text-color);
    width: 100%;
    overflow: hidden;
    max-width: 100%;
    word-break: break-word;
    padding-inline: 1px;
  `, [
    c('blockquote', `
      border-inline-start: solid 4px #e3e3e3;
      color: #666666;
      margin-inline: 0;
      padding-block: 0;
      padding-inline: 1em;
    `),
  ]),
  cB('markdown .markdown-alert', `
    border-inline-start: solid 4px #e3e3e3;
    margin-block: 1em;
    padding-inline-start: 1em;
  `),
  cB('markdown .markdown-alert-note', `
    border-inline-start-color: #0072f5;
  `),
  cB('markdown .markdown-alert-note .markdown-alert-title', `
    color: #0072f5;
    fill: #0072f5;
  `),
  cB('markdown .markdown-alert-tip', `
    border-inline-start-color: #379d4a;
  `),
  cB('markdown .markdown-alert-tip .markdown-alert-title', `
    color: #379d4a;
    fill: #379d4a;
  `),
  cB('markdown .markdown-alert-important', `
    border-inline-start-color: #bd54c6;
  `),
  cB('markdown .markdown-alert-important .markdown-alert-title', `
    color: #bd54c6;
    fill: #bd54c6;
  `),
  cB('markdown .markdown-alert-warning', `
    border-inline-start-color: #ee9e0b;
  `),
  cB('markdown .markdown-alert-warning .markdown-alert-title', `
    color: #ee9e0b;
    fill: #ee9e0b;
  `),
  cB('markdown .markdown-alert-caution', `
    border-inline-start-color: #ec5e41;
  `),
  cB('markdown .markdown-alert-caution .markdown-alert-title', `
    color: #ec5e41;
    fill: #ec5e41;
  `)
])
