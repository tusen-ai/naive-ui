import { c, cB, cE, cM } from '../../../_utils/cssr'

// vars:
// --n-bezier
// --n-color
// --n-text-color
// --n-border-color
// --n-toggle-button-color
// --n-toggle-bar-color
// --n-toggle-bar-color-hover
export default cB('layout-sider', `
  flex-shrink: 0;
  box-sizing: border-box;
  position: relative;
  z-index: 1;
  color: var(--n-text-color);
  transition:
    color .3s var(--n-bezier),
    border-color .3s var(--n-bezier),
    min-width .3s var(--n-bezier),
    max-width .3s var(--n-bezier),
    transform .3s var(--n-bezier),
    background-color .3s var(--n-bezier);
  background-color: var(--n-color);
  display: flex;
  justify-content: flex-end;
`, [
  cM('bordered', [
    cE('border', `
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      width: 1px;
      background-color: var(--n-border-color);
      transition: background-color .3s var(--n-bezier);
    `)
  ]),
  cE('left-placement', [
    cM('bordered', [
      cE('border', `
        right: 0;
      `)
    ])
  ]),
  cM('right-placement', `
    justify-content: flex-start;
  `, [
    cM('bordered', [
      cE('border', `
        left: 0;
      `)
    ]),
    cM('collapsed', [
      cB('layout-toggle-button', [
        cB('base-icon', `
          transform: rotate(180deg);
        `)
      ]),
      cB('layout-toggle-bar', [
        c('&:hover', [
          cE('top', {
            transform: 'rotate(-12deg) scale(1.15) translateY(-2px)'
          }),
          cE('bottom', {
            transform: 'rotate(12deg) scale(1.15) translateY(2px)'
          })
        ])
      ])
    ]),
    cB('layout-toggle-button', `
      left: 0;
      transform: translateX(-50%) translateY(-50%);
    `, [
      cB('base-icon', `
        transform: rotate(0);
      `)
    ]),
    cB('layout-toggle-bar', `
      left: -28px;
      transform: rotate(180deg);
    `, [
      c('&:hover', [
        cE('top', {
          transform: 'rotate(12deg) scale(1.15) translateY(-2px)'
        }),
        cE('bottom', {
          transform: 'rotate(-12deg) scale(1.15) translateY(2px)'
        })
      ])
    ])
  ]),
  cM('collapsed', [
    cB('layout-toggle-bar', [
      c('&:hover', [
        cE('top', {
          transform: 'rotate(-12deg) scale(1.15) translateY(-2px)'
        }),
        cE('bottom', {
          transform: 'rotate(12deg) scale(1.15) translateY(2px)'
        })
      ])
    ]),
    cB('layout-toggle-button', [
      cB('base-icon', `
        transform: rotate(0);
      `)
    ])
  ]),
  cB('layout-toggle-button', `
    transition:
      color .3s var(--n-bezier),
      right .3s var(--n-bezier),
      left .3s var(--n-bezier),
      border-color .3s var(--n-bezier),
      background-color .3s var(--n-bezier);
    cursor: pointer;
    width: 24px;
    height: 24px;
    position: absolute;
    top: 50%;
    right: 0;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    color: var(--n-toggle-button-icon-color);
    border: var(--n-toggle-button-border);
    background-color: var(--n-toggle-button-color);
    box-shadow: 0 2px 4px 0px rgba(0, 0, 0, .06);
    transform: translateX(50%) translateY(-50%);
    z-index: 1;
  `, [
    cB('base-icon', `
      transition: transform .3s var(--n-bezier);
      transform: rotate(180deg);
    `)
  ]),
  cB('layout-toggle-bar', `
    cursor: pointer;
    height: 72px;
    width: 32px;
    position: absolute;
    top: calc(50% - 36px);
    right: -28px;
  `, [
    cE('top, bottom', `
      position: absolute;
      width: 4px;
      border-radius: 2px;
      height: 38px;
      left: 14px;
      transition: 
        background-color .3s var(--n-bezier),
        transform .3s var(--n-bezier);
    `),
    cE('bottom', `
      position: absolute;
      top: 34px;
    `),
    c('&:hover', [
      cE('top', {
        transform: 'rotate(12deg) scale(1.15) translateY(-2px)'
      }),
      cE('bottom', {
        transform: 'rotate(-12deg) scale(1.15) translateY(2px)'
      })
    ]),
    cE('top, bottom', {
      backgroundColor: 'var(--n-toggle-bar-color)'
    }),
    c('&:hover', [
      cE('top, bottom', {
        backgroundColor: 'var(--n-toggle-bar-color-hover)'
      })
    ])
  ]),
  cE('border', `
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 1px;
    transition: background-color .3s var(--n-bezier);
  `),
  cB('layout-sider-scroll-container', `
    flex-grow: 1;
    flex-shrink: 0;
    box-sizing: border-box;
    height: 100%;
    opacity: 0;
    transition: opacity .3s var(--n-bezier);
    max-width: 100%;
  `),
  cM('show-content', [
    cB('layout-sider-scroll-container', {
      opacity: 1
    })
  ]),
  cM('absolute-positioned', `
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
  `)
])
