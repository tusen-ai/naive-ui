import { c, cB } from '../../../_utils/cssr'

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
    c(`h1,h2,h3,h4,h5,h6`, `
      transition: color .3s var(--n-bezier);
      color: var(--n-text-color);`
    ),
    c(`p`, `
      box-sizing: border-box;
      transition: color .3s var(--n-bezier);
      font-size: var(--n-font-size);
      line-height: var(--n-line-height);
      color: var(--n-text-color);
    `),
    c(`hr`, `
      margin: 12px 0;
      transition: border-color .3s var(--n-bezier);
      border-left: none;
      border-right: none;
      border-bottom: none;
      border-top: 1px solid var(--n-hr-color);
    `),
    c(`ul`, `
      font-size: var(--n-font-size);
      padding: var(--n-ul-padding);
    `),
    c(`ol`, `
      font-size: var(--n-font-size);
      padding: var(--n-ol-padding);
    `),
    c(`a`, `
      cursor: pointer;
      transition: color .3s var(--n-bezier), text-decoration-color .3s var(--n-bezier);
      text-decoration-color: var(--n-a-text-color);
      color: var(--n-a-text-color);
    `),
    c('.contains-task-list', `
      list-style-type: none;
      padding-inline-start: 0;
    `),
    c('table thead', `
      background: var(--n-thead-bg-color);
    `),
    c('table th', `
      padding: var(--n-th-padding);
      text-align: start;
      padding-inline: 1em;
    `),
    c('table td',`
      min-width: 120px;
      padding: var(--n-td-padding);
      padding-inline: 1em;
    `),   
    c(`code`, `
      background-color: var(--n-code-bg-color);
      padding: var(--n-code-padding);
    `),
    c('pre', `
      background-color: #F3F3F3;
      padding: 16px;
      overflow-x: auto;
      margin: 0;
      text-wrap: nowrap;
      margin-block-start: 12px;
    `),
    c('pre code', `
        display: block;
    `)
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
  `),
  cB('markdown .octicon', `
    overflow: visible !important;
    display: inline-block;
    -webkit-margin-end: 0.5em;
    margin-inline-end: 0.5em;
    vertical-align: text-bottom;
  `)
])
