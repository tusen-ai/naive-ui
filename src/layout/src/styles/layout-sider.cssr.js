import { c, cB, cE, cM } from '../../../_utils/cssr'

// vars:
// --bezier
// --sider-color
// --sider-border-color
// --sider-toggle-button-color
// --sider-toggle-bar-color
// --sider-toggle-bar-color-hover
export default cB('layout-sider', `
  box-sizing: border-box;
  position: relative;
  z-index: auto;
  transition:
    min-width .3s var(--bezier),
    max-width .3s var(--bezier),
    transform .3s var(--bezier),
    background-color .3s var(--bezier);
  background-color: var(--sider-color);
`, [
  cB('layout-toggle-button', `
    z-index: 1;
    transition:
      transform .3s var(--bezier),
      fill .3s var(--bezier);
    cursor: pointer;
    width: 36px;
    height: 36px;
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateX(50%) translateY(-50%);
    fill: var(--sider-toggle-button-color);
  `),
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
        background-color .3s var(--bezier),
        transform .3s var(--bezier);
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
    cM('collapsed', [
      c('&:hover', [
        cE('top', {
          transform: 'rotate(-12deg) scale(1.15) translateY(-2px)'
        }),
        cE('bottom', {
          transform: 'rotate(12deg) scale(1.15) translateY(2px)'
        })
      ])
    ]),
    cE('top, bottom', {
      backgroundColor: 'var(--sider-toggle-bar-color)'
    }),
    c('&:hover', [
      cE('top, bottom', {
        backgroundColor: 'var(--sider-toggle-bar-color-hover)'
      })
    ])
  ]),
  cE('border', `
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 1px;
    transition: background-color .3s var(--bezier);
  `),
  cE('content', `
    opacity: 0;
    transition: opacity .3s var(--bezier);
  `),
  cM('show-content', [
    cE('content', {
      opacity: 1
    })
  ]),
  cM('collapsed', [
    cB('layout-toggle-button', {
      transform: 'translateX(50%) translateY(-50%) rotate(180deg)'
    })
  ]),
  cM('absolute-positioned', `
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
  `, [
    cE('content', `
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
    `)
  ]),
  cM('bordered', [
    cE('border', {
      backgroundColor: 'var(--sider-border-color)'
    })
  ])
])
