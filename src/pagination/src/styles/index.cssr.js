import { cB, c, cE, cM, cNotM } from '../../../_utils/cssr'

// vars:
// --item-font-size
// --select-width
// --input-width
// --input-margin
// --item-size
// --item-text-color
// --item-text-color-disabled
// --item-text-color-hover
// --item-text-color-active
// --item-color
// --item-color-hover
// --item-color-disabled
// --item-color-active
// --item-border
// --item-border-hover
// --item-border-disabled
// --item-border-active
// --item-padding
// --item-font-size
// --item-border-radius
// --bezier
// --jumper-font-size
// --jumper-text-color
// --jumper-text-color-disabled
// --item-margin
// --button-icon-size
// --button-icon-color
// --button-icon-color-hover
// --button-icon-color-pressed
export default cB('pagination', `
  display: flex;
  vertical-align: middle;
  font-size: var(--item-font-size);
  flex-wrap: nowrap;
`, [
  c('> *:not(:first-child)', {
    margin: 'var(--item-margin)'
  }),
  cB('select', {
    width: 'var(--select-width)'
  }),
  cM('transition-disabled', [
    cB('pagination-item', {
      transition: 'none!important'
    })
  ]),
  cB('pagination-quick-jumper', `
    white-space: nowrap;
    display: flex;
    color: var(--jumper-text-color);
    transition: color .3s var(--bezier);
    align-items: center;
    font-size: var(--jumter-font-size);
  `, [
    cB('input', `
      margin: var(--input-margin);
      width: var(--input-width);
    `, [
      cE('placeholder', {
        left: '6px',
        right: '6px'
      }),
      c('input', `
        padding-left: 6px;
        padding-right: 6px;
      `)
    ])
  ]),
  cB('pagination-item', `
    position: relative;
    cursor: pointer;
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    min-width: var(--item-size);
    height: var(--item-size);
    padding: var(--item-padding);
    background-color: var(--item-color);
    color: var(--item-text-color);
    border-radius: var(--item-border-radius);
    border: var(--item-border);
    fill: var(--button-icon-color);
    transition:
      color .3s var(--bezier),
      border-color .3s var(--bezier),
      background-color .3s var(--bezier),
      fill .3s var(--bezier);
  `, [

    cM('button', {
      background: 'var(--item-color)',
      color: 'var(--button-icon-color)',
      border: 'var(--button-border)',
      fontSize: 'var(--button-icon-size)'
    }),
    cNotM('disabled', [
      c('&:hover', {
        background: 'var(--item-color-hover)',
        color: 'var(--item-text-color-hover)',
        border: 'var(--item-border-hover)'
      }, [
        cM('button', {
          background: 'var(--button-color-hover)',
          border: 'var(--button-border-hover)',
          color: 'var(--button-icon-color-hover)'
        })
      ]),
      c('&:active', {
        background: 'var(--item-color-pressed)',
        color: 'var(--item-text-color-pressed)',
        border: 'var(--item-border-pressed)'
      }, [
        cM('button', {
          background: 'var(--button-color-pressed)',
          border: 'var(--button-border-pressed)',
          color: 'var(--button-icon-color-pressed)'
        })
      ]),
      cM('active', {
        background: 'var(--item-color-active)',
        color: 'var(--item-text-color-active)',
        border: 'var(--item-border-active)'
      })
    ]),
    cM('disabled', `
      cursor: not-allowed;
      color: var(--item-text-color-disabled);
    `, [
      cM('active, button', {
        backgroundColor: 'var(--item-color-disabled)',
        border: 'var(--item-border-disabled)'
      })
    ])
  ]),
  cM('disabled', {
    cursor: 'not-allowed'
  }, [
    cB('pagination-quick-jumper', {
      color: 'var(--jumper-text-color-disabled)'
    })
  ])
])
