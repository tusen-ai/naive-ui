import { c, cB, cE, cM, cNotM } from '../../../_utils/cssr'

// vars:
// --bezier
// --button-border-radius
// --button-box-shadow
// --button-color
// --button-width
// --button-width-pressed
// --height
// --offset
// --rail-border-radius
// --rail-color
// --rail-color-active
// --rail-height
// --rail-width
// --width
// --box-shadow-focus
export default cB('switch', `
  height: var(--height);
  width: var(--width);
  vertical-align: middle;
  user-select: none;
  display: inline-flex;
  outline: none;
  justify-content: center;
  align-items: center;
`, [
  c('&:focus', [
    cE('rail', `
      box-shadow: var(--box-shadow-focus);
    `)
  ]),
  cM('round', [
    cE('rail', {
      borderRadius: 'calc(var(--rail-height) / 2)'
    }, [
      c('&::before', {
        borderRadius: 'calc(var(--button-height) / 2)'
      })
    ])
  ]),
  cNotM('disabled', [
    cM('pressed', [
      cE('rail', [
        c('&::before', {
          maxWidth: 'var(--button-width-pressed)'
        })
      ])
    ]),
    cE('rail', [
      c('&:active::before', {
        maxWidth: 'var(--button-width-pressed)'
      })
    ]),
    cM('active', [
      cM('pressed', [
        cE('rail', [
          c('&::before', {
            left: 'calc(100% - var(--offset) - var(--button-width-pressed))'
          })
        ])
      ]),
      cE('rail', [
        c('&:active::before', {
          left: 'calc(100% - var(--offset) - var(--button-width-pressed))'
        })
      ])
    ])
  ]),
  cM('active', [
    cE('rail', [
      c('&::before', {
        left: 'calc(100% - (var(--rail-height) + var(--button-width)) / 2)'
      })
    ])
  ]),
  cE('rail', `
    height: var(--rail-height);
    width: var(--rail-width);
    border-radius: var(--rail-border-radius);
    cursor: pointer;
    position: relative;
    transition:
      background-color .3s var(--bezier),
      box-shadow .3s var(--bezier);
    background-color: var(--rail-color);
  `, [
    c('&::before', `
      top: var(--offset);
      left: var(--offset);
      height: var(--button-width);
      width: var(--button-width-pressed);
      max-width: var(--button-width);
      border-radius: var(--button-border-radius);
      background-color: var(--button-color);
      box-shadow: var(--button-box-shadow);
      box-sizing: border-box;
      cursor: inherit;
      content: "";
      position: absolute;
      transition:
        background-color .3s var(--bezier),
        left .3s var(--bezier),
        opacity .3s var(--bezier),
        max-width .3s var(--bezier),
        box-shadow .3s var(--bezier);
    `)
  ]),
  cM('active', [
    cE('rail', {
      backgroundColor: 'var(--rail-color-active)'
    })
  ]),
  cM('disabled', [
    cE('rail', `
      cursor: not-allowed;
      opacity: .5;
    `)
  ])
])
