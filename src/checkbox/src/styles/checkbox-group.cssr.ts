import { c, cB, cE, cM, cNotM } from '../../../_utils/cssr'

// vars:
// --n-bezier
// --n-button-color
// --n-button-color-checked
// --n-button-text-color
// --n-button-text-color-checked
// --n-button-text-color-hover
// --n-button-border
// --n-button-border-checked
// --n-button-box-shadow-focus
// --n-button-border-radius
// --n-button-height
// --n-opacity-disabled
export default c([
  cB('checkbox-group', [
    cE('splitor', `
      display: inline-block;
      vertical-align: bottom;
      width: 1px;
      transition:
        background-color .3s var(--n-bezier),
        opacity .3s var(--n-bezier);
      background: var(--n-button-border);
    `, [
      cM('checked', {
        backgroundColor: 'var(--n-button-border-checked)'
      }),
      cM('disabled', {
        opacity: 'var(--n-opacity-disabled)'
      })
    ]),
    cM('button-group', `
      white-space: nowrap;
      height: var(--n-button-height);
      line-height: var(--n-button-height);
    `, [
      cB('checkbox-button', {
        height: 'var(--n-button-height)',
        lineHeight: 'var(--n-button-height)'
      }),
      cE('splitor', {
        height: 'var(--n-button-height)'
      })
    ])
  ]),
  cB('checkbox-button', `
    vertical-align: bottom;
    outline: none;
    position: relative;
    user-select: none;
    -webkit-user-select: none;
    display: inline-block;
    box-sizing: border-box;
    padding-left: 14px;
    padding-right: 14px;
    white-space: nowrap;
    cursor: pointer;
    transition:
      background-color .3s var(--n-bezier),
      opacity .3s var(--n-bezier),
      border-color .3s var(--n-bezier),
      color .3s var(--n-bezier);
    background: var(--n-button-color);
    color: var(--n-button-text-color);
    border-top: 1px solid var(--n-button-border);
    border-bottom: 1px solid var(--n-button-border);
  `, [
    cB('checkbox-button__input', `
      pointer-events: none;
      position: absolute;
      border: 0;
      border-radius: inherit;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      opacity: 0;
      z-index: 1;
    `),
    c('&:first-child', `
      border-top-left-radius: var(--n-button-border-radius);
      border-bottom-left-radius: var(--n-button-border-radius);
      border-left: 1px solid var(--n-button-border);
    `),
    c('&:last-child', `
      border-top-right-radius: var(--n-button-border-radius);
      border-bottom-right-radius: var(--n-button-border-radius);
      border-right: 1px solid var(--n-button-border);
    `),
    cNotM('disabled', `
      cursor: pointer;
    `, [
      c('&:hover', {
        color: 'var(--n-button-text-color-hover)'
      })
    ]),
    cM('checked', `
      background: var(--n-button-color-checked);
      color: var(--n-button-text-color-checked);
      border-color: var(--n-button-border-checked);
    `),
    cM('disabled', `
      cursor: not-allowed;
      opacity: var(--n-opacity-disabled);
    `)
  ])
])
