import { cB, cE, cM, c, cNotM } from '../../../_utils/cssr'

// vars:
// --bezier
// --button-border-color
// --height
// --opacity-disabled
export default cB('radio-group', {
  display: 'inline-block'
}, [
  cE('splitor', `
    display: inline-block;
    vertical-align: bottom;
    width: 1px;
    transition:
      background-color .3s var(--bezier),
      opacity .3s var(--bezier);
    background: var(--button-border-color);
  `, [
    cM('checked', {
      backgroundColor: 'var(--button-border-color-active)'
    }),
    cM('disabled', {
      opacity: 'var(--opacity-disabled)'
    })
  ]),
  cM('button-group', `
    white-space: nowrap;
    height: var(--height);
    line-height: var(--height);
  `, [
    cB('radio-button', {
      height: 'var(--height)',
      lineHeight: 'var(--height)'
    }),
    cE('splitor', {
      height: 'var(--height)'
    })
  ]),
  cB('radio-button', `
    vertical-align: bottom;
    outline: none;
    position: relative;
    user-select: none;
    display: inline-block;
    box-sizing: border-box;
    padding-left: 14px;
    padding-right: 14px;
    white-space: nowrap;
    transition:
      background-color .3s var(--bezier),
      opacity .3s var(--bezier),
      border-color .3s var(--bezier),
      color .3s var(--bezier);
    color: var(--button-text-color);
    border-top: 1px solid var(--button-border-color);
    border-bottom: 1px solid var(--button-border-color);
  `, [
    cE('radio-input', `
      border: 0;
      width: 0;
      height: 0;
      opacity: 0;
      margin: 0;
    `),
    cE('state-border', `
      pointer-events: none;
      position: absolute;
      box-shadow: var(--button-box-shadow);
      transition: box-shadow .3s var(--bezier);
      left: -1px;
      bottom: -1px;
      right: -1px;
      top: -1px;
    `),
    c('&:first-child', `
      border-top-left-radius: var(--button-border-radius);
      border-bottom-left-radius: var(--button-border-radius);
      border-left: 1px solid var(--button-border-color);
    `, [
      cE('state-border', `
        border-top-left-radius: var(--button-border-radius);
        border-bottom-left-radius: var(--button-border-radius);
      `)
    ]),
    c('&:last-child', `
      border-top-right-radius: var(--button-border-radius);
      border-bottom-right-radius: var(--button-border-radius);
      border-right: 1px solid var(--button-border-color);
    `, [
      cE('state-border', `
        border-top-right-radius: var(--button-border-radius);
        border-bottom-right-radius: var(--button-border-radius);
      `)
    ]),
    cNotM('disabled', `
      cursor: pointer;
    `, [
      c('&:hover', [
        cE('state-border', `
          transition: box-shadow .3s var(--bezier);
          box-shadow: var(--button-box-shadow-hover);
        `),
        cNotM('checked', {
          color: 'var(--button-text-color-hover)'
        })
      ]),
      cM('focus', [
        c('&:not(:active)', [
          cE('state-border', {
            boxShadow: 'var(--button-box-shadow-focus)'
          })
        ])
      ])
    ]),
    cM('checked', `
      background: var(--button-color-active);
      color: var(--button-text-color-active);
      border-color: var(--button-border-color-active);
    `),
    cM('disabled', `
      cursor: not-allowed;
      opacity: var(--opacity-disabled);
    `)
  ])
])
