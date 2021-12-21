import { c, cE, cM, cNotM, cB } from '../../../_utils/cssr'

// vars:
// --n-bezier
// --n-box-shadow
// --n-box-shadow-active
// --n-box-shadow-disabled
// --n-box-shadow-focus
// --n-box-shadow-hover
// --n-color
// --n-color-disabled
// --n-dot-color-active
// --n-dot-color-disabled
// --n-font-size
// --n-radio-size
// --n-text-color
// --n-text-color-disabled
// --n-label-padding
export default cB('radio', `
  line-height: 1;
  outline: none;
  position: relative;
  user-select: none;
  display: inline-flex;
  vertical-align: middle;
  align-items: center;
  font-size: var(--n-font-size);
`, [
  cE('dot', `
    height: var(--n-radio-size);
    width: var(--n-radio-size);
  `),
  cB('radio-input', `
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
  cE('dot', `
    background: var(--n-color);
    box-shadow: var(--n-box-shadow);
    transition:
      background-color .3s var(--n-bezier),
      box-shadow .3s var(--n-bezier);
      position: relative;
      border-radius: 50%;
  `, [
    c('&::before', `
      content: "";
      opacity: 0;
      position: absolute;
      left: 4px;
      top: 4px;
      height: calc(100% - 8px);
      width: calc(100% - 8px);
      border-radius: 50%;
      transform: scale(.8);
      background: var(--n-dot-color-active);
      transition: 
        opacity .3s var(--n-bezier),
        background-color .3s var(--n-bezier),
        transform .3s var(--n-bezier);
    `),
    cM('checked', {
      boxShadow: 'var(--n-box-shadow-active)'
    }, [
      c('&::before', `
        opacity: 1;
        transform: scale(1);
      `)
    ])
  ]),
  cE('label', `
    color: var(--n-text-color);
    padding: var(--n-label-padding);
    display: inline-block;
    white-space: nowrap;
    transition: color .3s var(--n-bezier);
  `),
  cNotM('disabled', `
    cursor: pointer;
  `, [
    c('&:hover', [
      cE('dot', {
        boxShadow: 'var(--n-box-shadow-hover)'
      })
    ]),
    cM('focus', [
      c('&:not(:active)', [
        cE('dot', {
          boxShadow: 'var(--n-box-shadow-focus)'
        })
      ])
    ])
  ]),
  cM('disabled', `
    cursor: not-allowed;
  `, [
    cE('dot', {
      boxShadow: 'var(--n-box-shadow-disabled)',
      backgroundColor: 'var(--n-color-disabled)'
    }, [
      c('&::before', {
        backgroundColor: 'var(--n-dot-color-disabled)'
      }),
      cM('checked', `
        transform: scale(1);
        opacity: 1;
      `)
    ]),
    cE('label', {
      color: 'var(--n-text-color-disabled)'
    })
  ])
])
