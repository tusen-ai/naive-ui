import { cB, c, cM, cE } from '../../../_utils/cssr'
import fadeInTransition from '../../../_styles/transitions/fade-in.cssr'

// vars:
// --bezier
// --color
// --color-hover
export default cB('scrollbar', `
  overflow: hidden;
  position: relative;
  z-index: auto;
  height: 100%;
`, [
  c('>', [
    cB('scrollbar-container', `
      width: 100%;
      overflow: scroll;
      height: 100%;
      max-height: inherit;
      scrollbar-width: none;
    `, [
      c('&::-webkit-scrollbar', `
        width: 0;
        height: 0;
      `),
      c('>', [
        cB('scrollbar-content', `
          box-sizing: border-box;
          overflow: hidden;
          min-width: 100%;
        `)
      ])
    ]),
    cB('scrollbar-rail', `
      position: absolute;
      pointer-events: none;
      user-select: none;
    `, [
      cM('horizontal', `
        left: 2px;
        right: 2px;
        bottom: 4px;
      `, [
        c('>', [
          cE('scrollbar', {
            right: 0
          })
        ])
      ]),
      cM('vertical', `
        right: 4px;
        top: 2px;
        bottom: 2px;
      `, [
        c('>', [
          cE('scrollbar', {
            bottom: 0
          })
        ])
      ]),
      cM('disabled', [
        c('>', [
          cE('scrollbar', {
            pointerEvents: 'none'
          })
        ])
      ]),
      c('>', [
        cE('scrollbar', `
          position: absolute;
          cursor: pointer;
          pointer-events: all;
          background-color: var(--color);
          transition: background-color .2s var(--bezier);
        `, [
          fadeInTransition(),
          c('&:hover', {
            backgroundColor: 'var(--color-hover)'
          })
        ])
      ])
    ])
  ])
])
