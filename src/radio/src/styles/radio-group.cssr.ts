import { cB, cE, cM, c, cNotM } from '../../../_utils/cssr'

// vars:
// --n-bezier
// --n-button-border-color
// --n-button-border-color-active
// --n-height
// --n-opacity-disabled
// --n-font-size
export default cB('radio-group', `
  display: inline-block;
  font-size: var(--n-font-size);
`, [
  cE('splitor', `
    display: inline-block;
    vertical-align: bottom;
    width: 1px;
    transition:
      background-color .3s var(--n-bezier),
      opacity .3s var(--n-bezier);
    background: var(--n-button-border-color);
  `, [
    cM('checked', {
      backgroundColor: 'var(--n-button-border-color-active)'
    }),
    cM('disabled', {
      opacity: 'var(--n-opacity-disabled)'
    })
  ]),
  cM('button-group', `
    white-space: nowrap;
    height: var(--n-height);
    line-height: var(--n-height);
  `, [
    cB('radio-button', {
      height: 'var(--n-height)',
      lineHeight: 'var(--n-height)'
    }),
    cE('splitor', {
      height: 'var(--n-height)'
    })
  ]),
  cB('radio-button', `
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
    transition:
      background-color .3s var(--n-bezier),
      opacity .3s var(--n-bezier),
      border-color .3s var(--n-bezier),
      color .3s var(--n-bezier);
    background: var(--n-button-color);
    color: var(--n-button-text-color);
    border-top: 1px solid var(--n-button-border-color);
    border-bottom: 1px solid var(--n-button-border-color);
  `, [
    cB('radio-input', `
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
    cE('state-border', `
      z-index: 1;
      pointer-events: none;
      position: absolute;
      box-shadow: var(--n-button-box-shadow);
      transition: box-shadow .3s var(--n-bezier);
      left: -1px;
      bottom: -1px;
      right: -1px;
      top: -1px;
    `),
    c('&:first-child', `
      border-top-left-radius: var(--n-button-border-radius);
      border-bottom-left-radius: var(--n-button-border-radius);
      border-left: 1px solid var(--n-button-border-color);
    `, [
      cE('state-border', `
        border-top-left-radius: var(--n-button-border-radius);
        border-bottom-left-radius: var(--n-button-border-radius);
      `)
    ]),
    c('&:last-child', `
      border-top-right-radius: var(--n-button-border-radius);
      border-bottom-right-radius: var(--n-button-border-radius);
      border-right: 1px solid var(--n-button-border-color);
    `, [
      cE('state-border', `
        border-top-right-radius: var(--n-button-border-radius);
        border-bottom-right-radius: var(--n-button-border-radius);
      `)
    ]),
    cNotM('disabled', `
      cursor: pointer;
    `, [
      c('&:hover', [
        cE('state-border', `
          transition: box-shadow .3s var(--n-bezier);
          box-shadow: var(--n-button-box-shadow-hover);
        `),
        cNotM('checked', {
          color: 'var(--n-button-text-color-hover)'
        })
      ]),
      cM('focus', [
        c('&:not(:active)', [
          cE('state-border', {
            boxShadow: 'var(--n-button-box-shadow-focus)'
          })
        ])
      ])
    ]),
    cM('checked', `
      background: var(--n-button-color-active);
      color: var(--n-button-text-color-active);
      border-color: var(--n-button-border-color-active);
    `),
    cM('disabled', `
      cursor: not-allowed;
      opacity: var(--n-opacity-disabled);
    `)
  ])
])
