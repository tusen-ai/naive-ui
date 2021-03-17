import { c, cE, cM, cNotM, cB } from '../../../_utils/cssr'

// vars:
// --bezier
// --box-shadow
// --box-shadow-active
// --box-shadow-disabled
// --box-shadow-focus
// --box-shadow-hover
// --color
// --color-disabled
// --dot-color-active
// --dot-color-disabled
// --font-size
// --radio-size
// --text-color
// --text-color-disabled
// --label-padding
export default cB('radio', `
  line-height: 1;
  outline: none;
  position: relative;
  user-select: none;
  display: inline-flex;
  vertical-align: middle;
  align-items: center;
  font-size: var(--font-size);
`, [
  cE('dot', `
    height: var(--radio-size);
    width: var(--radio-size);
  `),
  cE('radio-input', `
    border: 0;
    width: 0;
    height: 0;
    opacity: 0;
    margin: 0;
  `),
  cE('dot', `
    background: var(--color);
    box-shadow: var(--box-shadow);
    transition:
      background-color .3s var(--bezier),
      box-shadow .3s var(--bezier);
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
      background: var(--dot-color-active);
      transition: 
        opacity .3s var(--bezier),
        background-color .3s var(--bezier),
        transform .3s var(--bezier);
    `),
    cM('checked', {
      boxShadow: 'var(--box-shadow-active)'
    }, [
      c('&::before', `
        opacity: 1;
        transform: scale(1);
      `)
    ])
  ]),
  cE('label', `
    color: var(--text-color);
    padding: var(--label-padding);
    display: inline-block;
    white-space: nowrap;
    transition: color .3s var(--bezier);
  `),
  cNotM('disabled', `
    cursor: pointer;
  `, [
    c('&:hover', [
      cE('dot', {
        boxShadow: 'var(--box-shadow-hover)'
      })
    ]),
    cM('focus', [
      c('&:not(:active)', [
        cE('dot', {
          boxShadow: 'var(--box-shadow-focus)'
        })
      ])
    ])
  ]),
  cM('disabled', `
    cursor: not-allowed;
  `, [
    cE('dot', {
      boxShadow: 'var(--box-shadow-disabled)',
      backgroundColor: 'var(--color-disabled)'
    }, [
      c('&::before', {
        backgroundColor: 'var(--dot-color-disabled)'
      }),
      cM('checked', `
        transform: scale(1);
        opacity: 1;
      `)
    ]),
    cE('label', {
      color: 'var(--text-color-disabled)'
    })
  ])
])
