import { cB, c, cE, cM, cNotM } from '../../../_utils/cssr'

// vars:
// --n-bezier
// --n-color
// --n-font-size
// --n-border-radius
// --n-height
// --n-padding-left
// --n-padding-right
// --n-text-color
// --n-text-color-disabled
// --n-caret-color
// --n-text-decoration-color
// --n-border
// --n-border-disabled
// --n-border-hover
// --n-border-focus
// --n-placeholder-color
// --n-placeholder-color-disabled
// --n-line-height-textarea
// --n-color-disabled
// --n-color-focus
// --n-box-shadow-focus
// --n-clear-color
// --n-clear-size
// --n-clear-color-hover
// --n-clear-color-pressed
// --n-suffix-text-color
// --n-icon-color
// --n-icon-color-hover
// --n-icon-color-pressed
// --n-icon-color-disabled
// --n-count-text-color
// --n-count-text-color-disabled
// --n-loading-color
// ...form item vars
export default cB('input', `
  max-width: 100%;
  cursor: text;
  line-height: 1.5;
  z-index: auto;
  outline: none;
  box-sizing: border-box;
  position: relative;
  display: inline-flex;
  border-radius: var(--n-border-radius);
  background-color: var(--n-color);
  transition: background-color .3s var(--n-bezier);
  font-size: var(--n-font-size);
  --n-padding-vertical: calc((var(--n-height) - 1.5 * var(--n-font-size)) / 2);
`, [
  // common
  cE('input, textarea', `
    overflow: hidden;
    flex-grow: 1;
    position: relative;
  `),
  cE('input-el, textarea-el, input-mirror, textarea-mirror, separator, placeholder', `
    box-sizing: border-box;
    font-size: inherit;
    line-height: 1.5;
    font-family: inherit;
    border: none;
    outline: none;
    background-color: #0000;
    text-align: inherit;
    transition:
      -webkit-text-fill-color .3s var(--n-bezier),
      caret-color .3s var(--n-bezier),
      color .3s var(--n-bezier),
      text-decoration-color .3s var(--n-bezier);
  `),
  cE('input-el, textarea-el', `
    -webkit-appearance: none;
    scrollbar-width: none;
    width: 100%;
    min-width: 0;
    text-decoration-color: var(--n-text-decoration-color);
    color: var(--n-text-color);
    caret-color: var(--n-caret-color);
    background-color: transparent;
  `, [
    c('&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb', `
      width: 0;
      height: 0;
      display: none;
    `),
    c('&::placeholder', `
      color: #0000;
      -webkit-text-fill-color: transparent !important;
    `),
    c('&:-webkit-autofill ~', [
      cE('placeholder', 'display: none;')
    ])
  ]),
  cM('round', [
    cNotM('textarea', 'border-radius: calc(var(--n-height) / 2);')
  ]),
  cE('placeholder', `
    pointer-events: none;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    overflow: hidden;
    color: var(--n-placeholder-color);
  `, [
    c('span', `
      width: 100%;
      display: inline-block;
    `)
  ]),
  cM('textarea', [
    cE('placeholder', 'overflow: visible;')
  ]),
  cNotM('autosize', 'width: 100%;'),
  cM('autosize', [
    cE('textarea-el, input-el', `
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
    `)
  ]),
  // input
  cB('input-wrapper', `
    overflow: hidden;
    display: inline-flex;
    flex-grow: 1;
    position: relative;
    padding-left: var(--n-padding-left);
    padding-right: var(--n-padding-right);
  `),
  cE('input-mirror', `
    padding: 0;
    height: var(--n-height);
    line-height: var(--n-height);
    overflow: hidden;
    visibility: hidden;
    position: static;
    white-space: pre;
    pointer-events: none;
  `),
  cE('input-el', `
    padding: 0;
    height: var(--n-height);
    line-height: var(--n-height);
  `, [
    c('+', [
      cE('placeholder', `
        display: flex;
        align-items: center;  
      `)
    ])
  ]),
  cNotM('textarea', [
    cE('placeholder', 'white-space: nowrap;')
  ]),
  cE('eye', `
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color .3s var(--n-bezier);
  `),
  // textarea
  cM('textarea', 'width: 100%;', [
    cB('input-word-count', `
      position: absolute;
      right: var(--n-padding-right);
      bottom: var(--n-padding-vertical);
    `),
    cM('resizable', [
      cB('input-wrapper', `
        resize: vertical;
        min-height: var(--n-height);
      `)
    ]),
    cE('textarea-el, textarea-mirror, placeholder', `
      height: 100%;
      padding-left: 0;
      padding-right: 0;
      padding-top: var(--n-padding-vertical);
      padding-bottom: var(--n-padding-vertical);
      word-break: break-word;
      display: inline-block;
      vertical-align: bottom;
      box-sizing: border-box;
      line-height: var(--n-line-height-textarea);
      margin: 0;
      resize: none;
      white-space: pre-wrap;
    `),
    cE('textarea-mirror', `
      width: 100%;
      pointer-events: none;
      overflow: hidden;
      visibility: hidden;
      position: static;
      white-space: pre-wrap;
      overflow-wrap: break-word;
    `)
  ]),
  // pair
  cM('pair', [
    cE('input-el, placeholder', 'text-align: center;'),
    cE('separator', `
      display: flex;
      align-items: center;
      transition: color .3s var(--n-bezier);
      color: var(--n-text-color);
      white-space: nowrap;
    `, [
      cB('icon', `
        color: var(--n-icon-color);
      `),
      cB('base-icon', `
        color: var(--n-icon-color);
      `)
    ])
  ]),
  cM('disabled', `
    cursor: not-allowed;
    background-color: var(--n-color-disabled);
  `, [
    cE('border', 'border: var(--n-border-disabled);'),
    cE('input-el, textarea-el', `
      cursor: not-allowed;
      color: var(--n-text-color-disabled);
      text-decoration-color: var(--n-text-color-disabled);
    `),
    cE('placeholder', 'color: var(--n-placeholder-color-disabled);'),
    cE('separator', 'color: var(--n-text-color-disabled);', [
      cB('icon', `
        color: var(--n-icon-color-disabled);
      `),
      cB('base-icon', `
        color: var(--n-icon-color-disabled);
      `)
    ]),
    cB('input-word-count', `
      color: var(--n-count-text-color-disabled);
    `),
    cE('suffix, prefix', 'color: var(--n-text-color-disabled);', [
      cB('icon', `
        color: var(--n-icon-color-disabled);
      `),
      cB('internal-icon', `
        color: var(--n-icon-color-disabled);
      `)
    ])
  ]),
  cNotM('disabled', [
    cE('eye', `
      color: var(--n-icon-color);
      cursor: pointer;
    `, [
      c('&:hover', `
        color: var(--n-icon-color-hover);
      `),
      c('&:active', `
        color: var(--n-icon-color-pressed);
      `)
    ]),
    c('&:hover', [
      cE('state-border', 'border: var(--n-border-hover);')
    ]),
    cM('focus', 'background-color: var(--n-color-focus);', [
      cE('state-border', `
        border: var(--n-border-focus);
        box-shadow: var(--n-box-shadow-focus);
      `)
    ])
  ]),
  cE('border, state-border', `
    box-sizing: border-box;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    pointer-events: none;
    border-radius: inherit;
    border: var(--n-border);
    transition:
      box-shadow .3s var(--n-bezier),
      border-color .3s var(--n-bezier);
  `),
  cE('state-border', `
    border-color: #0000;
    z-index: 1;
  `),
  cE('prefix', 'margin-right: 4px;'),
  cE('suffix', `
    margin-left: 4px;
  `),
  cE('suffix, prefix', `
    transition: color .3s var(--n-bezier);
    flex-wrap: nowrap;
    flex-shrink: 0;
    line-height: var(--n-height);
    white-space: nowrap;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--n-suffix-text-color);
  `, [
    cB('base-loading', `
      font-size: var(--n-icon-size);
      margin: 0 2px;
      color: var(--n-loading-color);
    `),
    cB('base-clear', `
      font-size: var(--n-icon-size);
    `, [
      cE('placeholder', [
        cB('base-icon', `
          transition: color .3s var(--n-bezier);
          color: var(--n-icon-color);
          font-size: var(--n-icon-size);
        `)
      ])
    ]),
    c('>', [
      cB('icon', `
        transition: color .3s var(--n-bezier);
        color: var(--n-icon-color);
        font-size: var(--n-icon-size);
      `)
    ]),
    cB('base-icon', `
      font-size: var(--n-icon-size);
    `)
  ]),
  cB('input-word-count', `
    pointer-events: none;
    line-height: 1.5;
    font-size: .85em;
    color: var(--n-count-text-color);
    transition: color .3s var(--n-bezier);
    margin-left: 4px;
    font-variant: tabular-nums;
  `),
  ['warning', 'error'].map(status => cM(`${status}-status`, [
    cNotM('disabled', [
      cB('base-loading', `
        color: var(--n-loading-color-${status})
      `),
      cE('input-el, textarea-el', `
        caret-color: var(--n-caret-color-${status});
      `),
      cE('state-border', `
        border: var(--n-border-${status});
      `),
      c('&:hover', [
        cE('state-border', `
          border: var(--n-border-hover-${status});
        `)
      ]),
      c('&:focus', `
        background-color: var(--n-color-focus-${status});
      `, [
        cE('state-border', `
          box-shadow: var(--n-box-shadow-focus-${status});
          border: var(--n-border-focus-${status});
        `)
      ]),
      cM('focus', `
        background-color: var(--n-color-focus-${status});
      `, [
        cE('state-border', `
          box-shadow: var(--n-box-shadow-focus-${status});
          border: var(--n-border-focus-${status});
        `)
      ])
    ])
  ]))
])

export const safariStyle = cB('input', [
  cM('disabled', [
    cE('input-el, textarea-el', `
      -webkit-text-fill-color: var(--n-text-color-disabled);
    `)
  ])
])
