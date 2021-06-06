import { cB, c, cM, cE } from '../../../_utils/cssr'
import fadeInTransition from '../../../_styles/transitions/fade-in.cssr'

// vars:
// --scrollbar-bezier
// --scrollbar-color
// --scrollbar-color-hover
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
      c('&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb', `
        width: 0;
        height: 0;
        display: none;
      `),
      c('>', [
        cB('scrollbar-content', `
          box-sizing: border-box;
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
          background-color: var(--scrollbar-color);
          transition: background-color .2s var(--scrollbar-bezier);
        `, [
          fadeInTransition(),
          c('&:hover', {
            backgroundColor: 'var(--scrollbar-color-hover)'
          })
        ])
      ])
    ])
  ])
])
