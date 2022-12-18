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
// --n-label-line-height
// --n-color-active
export default cB('radio', `
  line-height: var(--n-label-line-height);
  outline: none;
  position: relative;
  user-select: none;
  -webkit-user-select: none;
  display: inline-flex;
  align-items: flex-start;
  flex-wrap: nowrap;
  font-size: var(--n-font-size);
  word-break: break-word;
`, [
  cM('checked', [
    cE('dot', `
      background-color: var(--n-color-active);
    `)
  ]),
  cE('dot-wrapper', `
    position: relative;
    flex-shrink: 0;
    flex-grow: 0;
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
    cursor: pointer;
  `),
  cE('dot', `
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    height: var(--n-radio-size);
    width: var(--n-radio-size);
    background: var(--n-color);
    box-shadow: var(--n-box-shadow);
    border-radius: 50%;
    transition:
      background-color .3s var(--n-bezier),
      box-shadow .3s var(--n-bezier);
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
    font-weight: var(--n-label-font-weight);
    display: inline-block;
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
        opacity: 1;
      `)
    ]),
    cE('label', {
      color: 'var(--n-text-color-disabled)'
    }),
    cB('radio-input', `
      cursor: not-allowed;
    `)
  ])
])
