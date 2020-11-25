import { cTB, c, cB, cM, cE } from '../../../_utils/cssr'
import fadeInTransition from '../../../_styles/transitions/fade-in'

export default c([
  ({ props }) => {
    const {
      color,
      colorHover
    } = props.$local
    const {
      cubicBezierEaseInOut
    } = props.$base
    return cTB('scrollbar', {
      raw: `
        overflow: hidden;
        position: relative;
        z-index: auto;
        height: 100%;
      `
    }, [
      c('>', [
        cB('scrollbar-container', {
          raw: `
            width: 100%;
            overflow: scroll;
            height: 100%;
            max-height: inherit;
            scrollbar-width: none;
          `
        }, [
          c('&::-webkit-scrollbar', {
            raw: `
              width: 0;
              height: 0;
            `
          }),
          c('>', [
            cB('scrollbar-content', {
              raw: `
                overflow: hidden;
                min-width: 100%;
              `
            })
          ])
        ]),
        cB('scrollbar-rail', {
          raw: `
            position: absolute;
            pointer-events: none;
            user-select: none;
          `
        }, [
          cM('horizontal', {
            raw: `
              left: 0;
              right: 0;
              bottom: 2.5px;
            `
          }, [
            c('>', [
              cE('scrollbar', {
                right: 0
              })
            ])
          ]),
          cM('vertical', {
            raw: `
              right: 2.5px;
              top: 0;
              bottom: 0;
            `
          }, [
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
            cE('scrollbar', {
              raw: `
                position: absolute;
                cursor: pointer;
                pointer-events: all;
                background-color: ${color};
                transition: background-color .2s ${cubicBezierEaseInOut};
              `
            }, [
              fadeInTransition(),
              c('&:hover', {
                backgroundColor: colorHover
              })
            ])
          ])
        ])
      ])
    ])
  }
])
