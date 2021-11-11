import { c, cB, cE, cM } from '../../../_utils/cssr'

// vars:
// --n-bezier
// --n-dots-slider-radius
// --n-dots-slider-width
// --n-dots-slider-height
// --n-dot-color
// --n-dot-color-active
// --n-outer-dot-color
// --n-outer-dot-color-active
// --n-dot-width
// --n-dot-height
// --n-dot-radius
// --n-dot-margin
// --n-arrow-color
export default cB('carousel', `
  overflow: hidden;
  position: relative;
`, [
  cE('slides', `
    transition: transform .3s var(--n-bezier);
    display: flex;
  `, [
    c('> div', `
      overflow: hidden;
    `, [
      c('> img', `
        display: block;
      `)
    ])
  ]),
  cE('dots', `
    position: absolute;
    display: flex;
    flex-wrap: nowrap;
  `, [
    cM('slider', `
      background-color: var(--dot-color);
      border-radius: var(--dots-slider-radius);
    `)
  ]),
  cE('dot', `
    width: var(--n-dot-width);
    height: var(--n-dot-height);
    background-color: var(--n-dot-color);
    border-radius: var(--n-dot-radius);
    cursor: pointer;
    transition:
      box-shadow .3s var(--n-bezier),
      background-color .3s var(--n-bezier);
    outline: none;
  `, [
    c('&:focus', `
      background-color: var(--n-dot-color-active);
    `),
    cM('active', `
      background-color: var(--n-dot-color-active);
    `),
    cM('slider', `
      background-color: transparent;
    `),
    c('&:last-child', `
      margin-right: 0;
    `)
  ]),
  cE('slider', `
    position: absolute;
    border-radius: var(--dot-radius);
    background-color: var(--dot-color-active);
    cursor: pointer;
    transition:
      left .2s var(--bezier),
      max-width .2s var(--bezier),
      background-color .3s var(--bezier);
  `),
  cE('arrow', `
    position: absolute;
    transition: transform .3s var(--n-bezier);
    transform: scale(1);
    cursor: pointer;
    height: 48px;
    width: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--n-arrow-color);
  `, [
    cM('right', `
      transform: translateY(-50%);
      top: 50%;
      right: 0;
    `, [
      c('&:hover', {
        transform: 'translateY(-50%) scale(1.1)'
      }),
      c('&:active', {
        transform: 'translateY(-50%) scale(1)'
      })
    ]),
    cM('left', `
      transform: translateY(-50%);
      top: 50%;
      left: 0;
    `, [
      c('&:hover', {
        transform: 'translateY(-50%) scale(1.1)'
      }),
      c('&:active', {
        transform: 'translateY(-50%) scale(1)'
      })
    ]),
    cM('top', `
      transform: translateX(-50%) rotate(90deg);
      top: 0;
      left: 50%;
    `, [
      c('&:hover', {
        transform: 'translateX(-50%) scale(1.1) rotate(90deg)'
      }),
      c('&:active', {
        transform: 'translateX(-50%) scale(1) rotate(90deg)'
      })
    ]),
    cM('bottom', `
      transform: translateX(-50%) rotate(90deg);
      bottom: 0;
      left: 50%;
    `, [
      c('&:hover', {
        transform: 'translateX(-50%) scale(1.1) rotate(90deg)'
      }),
      c('&:active', {
        transform: 'translateX(-50%) scale(1) rotate(90deg)'
      })
    ]),
    cM('outer', `
      transform: translateX(-50%) rotate(90deg);
      bottom: 0;
      left: 50%;
    `, [
      c('&:hover', {
        transform: 'translateX(-50%) scale(1.1) rotate(90deg)'
      }),
      c('&:active', {
        transform: 'translateX(-50%) scale(1) rotate(90deg)'
      })
    ]),
    c('svg', {
      height: '100%',
      width: '100%'
    })
  ]),
  cM('left', [
    cE('slides', `
      flex-direction: column;
    `),
    cE('dots', `
      transform: translateY(-50%);
      top: 50%;
      left: 16px;
      flex-direction: column;
    `),
    cE('dot', `
      margin-bottom: var(--dot-margin);
      height: var(--dot-width);
      width: var(--dot-height);
    `),
    cE('slider', `
      height: var(--dot-width);
      width: var(--dot-height);
    `)
  ]),
  cM('right', [
    cE('slides', `
      flex-direction: column;
    `),
    cE('dots', `
      transform: translateY(-50%);
      top: 50%;
      right: 16px;
      flex-direction: column;
    `),
    cE('dot', `
      margin-bottom: var(--dot-margin);
      height: var(--dot-width);
      width: var(--dot-height);
    `),
    cE('slider', `
      height: var(--dot-width);
      width: var(--dot-height);
    `)
  ]),
  cM('top', [
    cE('dots', `
      transform: translateX(-50%);
      top: 16px;
      left: 50%;
    `),
    cE('dot', `
      margin-right: var(--dot-margin);
    `),
    cE('slider', `
      width: var(--dot-width);
      height: var(--dot-height);
    `)
  ]),
  cM('bottom', [
    cE('dots', `
      transform: translateX(-50%);
      bottom: 16px;
      left: 50%;
    `),
    cE('dot', `
      margin-right: var(--dot-margin);
    `),
    cE('slider', `
      width: var(--dot-width);
      height: var(--dot-height);
    `)
  ]),
  cM('outer', `
    padding-bottom: 20px;
  `, [
    cE('dots', `
      transform: translateX(-50%);
      bottom: 0;
      left: 50%;
    `, [
      cM('slider', `
        background-color: var(--outer-dot-color);
      `)
    ]),
    cE('dot', `
      margin-right: var(--dot-margin);
      background-color: var(--outer-dot-color);
    `, [
      c('&:focus', `
        background-color: var(--outer-dot-color-active);
      `),
      cM('active', `
        background-color: var(--outer-dot-color-active);
      `)
    ]),
    cE('slider', `
      width: var(--dot-width);
      height: var(--dot-height);
    `)
  ])
])
