import { c, cB, cE, cM } from '../../../_utils/cssr'

// vars:
// --n-bezier
// --n-dot-color
// --n-dot-color-active
// --n-dot-size
// --n-arrow-color
export default cB('carousel', `
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`, [
  cE('slides', `
    display: flex;
    width: 100%;
    height: 100%;
    transition-timing-function: var(--n-bezier);
    perspective: 1200px;
  `, [
    cE('slide', `
      flex-shrink: 0;
      position: relative;
      width: 100%;
      height: 100%;
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
    cM('dot', [
      cE('dot', `
        height: var(--n-dot-size);
        width: var(--n-dot-size);
        background-color: var(--n-dot-color);
        border-radius: 50%;
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
        `)
      ])
    ]),
    cM('line', [
      cE('dot', `
        width: 16px;
        height: 3px;
        background-color: var(--n-dot-color);
        cursor: pointer;
        transition:
          box-shadow .3s var(--n-bezier),
          background-color .3s var(--n-bezier);
      `, [
        c('&:focus', `
          background-color: var(--n-dot-color-active);
        `),
        cM('active', `
          background-color: var(--n-dot-color-active);
        `)
      ])
    ]),
    cM('progress', `
      background: rgba(235, 235, 235, 1);
    `, [
      cE('dots-fill', `
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: #18a058;
        transform: scale(0);
        transform-origin: left top;
      `)
    ])
  ]),
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
    c('svg', {
      height: '100%',
      width: '100%'
    })
  ]),
  cM('vertical', [
    cE('slides', `
      flex-direction: column;
    `)
  ]),
  cM('usercontrol', [
    cE('slides > div', `
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
  `)
  ]),
  cM('left', [
    cE('dots', `
      transform: translateY(-50%);
      top: 50%;
      left: 16px;
      flex-direction: column;
    `, [
      cM('progress', `
        top: 0;
        left: 0;
        width: 6px;
        height: 100%;
        transform: translateY(0);
      `)
    ]),
    cE('dot', `
      margin: 6px 0;
    `)
  ]),
  cM('right', [
    cE('dots', `
      transform: translateY(-50%);
      top: 50%;
      right: 16px;
      flex-direction: column;
    `, [
      cM('progress', `
        top: 0;
        right: 0;
        width: 6px;
        height: 100%;
        transform: translateY(0);
      `)
    ]),
    cE('dot', `
      margin: 6px 0;
    `)
  ]),
  cM('top', [
    cE('dots', `
      transform: translateX(-50%);
      top: 16px;
      left: 50%;
    `, [
      cM('progress', `
        top: 0;
        left: 0;
        width: 100%;
        height: 6px;
        transform: translateX(0);
      `)
    ]),
    cE('dot', `
      margin: 0 6px;
    `)
  ]),
  cM('bottom', [
    cE('dots', `
      transform: translateX(-50%);
      bottom: 16px;
      left: 50%;
    `, [
      cM('progress', `
        bottom: 0;
        left: 0;
        width: 100%;
        height: 6px;
        transform: translateX(0);
      `)
    ]),
    cE('dot', `
      margin: 0 6px;
    `)
  ])
])
