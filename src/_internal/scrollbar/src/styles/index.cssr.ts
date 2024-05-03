import { cB, c, cM, cE } from '../../../../_utils/cssr'
import { fadeInTransition } from '../../../../_styles/transitions/fade-in.cssr'

// vars:
// --n-scrollbar-bezier
// --n-scrollbar-color
// --n-scrollbar-color-hover
// --n-scrollbar-width
// --n-scrollbar-height
// --n-scrollbar-border-radius
// --n-scrollbar-rail-inset-horizontal
// --n-scrollbar-rail-inset-vertical
// --n-scrollbar-rail-color
export default cB('scrollbar', `
  overflow: hidden;
  position: relative;
  z-index: auto;
  height: 100%;
  width: 100%;
`, [
  c('>', [
    cB('scrollbar-container', `
      width: 100%;
      overflow: scroll;
      height: 100%;
      min-height: inherit;
      max-height: inherit;
      scrollbar-width: none;
    `, [
      c('&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb', `
        width: 0;
        height: 0;
        display: none;
      `),
      c('>', [
        // We can't set overflow hidden since it affects positioning.
        cB('scrollbar-content', `
          box-sizing: border-box;
          min-width: 100%;
        `)
      ])
    ])
  ]),
  c('>, +', [
    cB('scrollbar-rail', `
      position: absolute;
      pointer-events: none;
      user-select: none;
      background: var(--n-scrollbar-rail-color);
      -webkit-user-select: none;
    `, [
      cM('horizontal', `
        inset: var(--n-scrollbar-rail-inset-horizontal);
        height: var(--n-scrollbar-height);
      `, [
        c('>', [
          cE('scrollbar', `
            height: var(--n-scrollbar-height);
            border-radius: var(--n-scrollbar-border-radius);
            right: 0;
          `)
        ])
      ]),
      cM('vertical', `
        inset: var(--n-scrollbar-rail-inset-vertical);
        width: var(--n-scrollbar-width);
      `, [
        c('>', [
          cE('scrollbar', `
            width: var(--n-scrollbar-width);
            border-radius: var(--n-scrollbar-border-radius);
            bottom: 0;
          `)
        ])
      ]),
      cM('disabled', [
        c('>', [
          cE('scrollbar', 'pointer-events: none;')
        ])
      ]),
      c('>', [
        cE('scrollbar', `
          z-index: 1;
          position: absolute;
          cursor: pointer;
          pointer-events: all;
          background-color: var(--n-scrollbar-color);
          transition: background-color .2s var(--n-scrollbar-bezier);
        `, [
          fadeInTransition(),
          c('&:hover', 'background-color: var(--n-scrollbar-color-hover);')
        ])
      ])
    ])
  ])
])
