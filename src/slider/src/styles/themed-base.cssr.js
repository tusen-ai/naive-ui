import { cTB, c, cB, cM, cE } from '../../../_utils/cssr'
import fadeInScaleUpTransition from '../../../styles/_transitions/fade-in-scale-up'

export default c([
  ({ props }) => {
    const {
      railBackgroundColorDefault,
      railBackgroundColorHover,
      railFillBackgroundColorDefault,
      railFillBackgroundColorHover,
      handleBackgroundColor,
      handleBoxShadowDefault,
      handleBoxShadowHover,
      handleBoxShadowActive,
      handleBoxShadowFocus,
      indicatorBackgroundColor,
      indicatorBoxShadow,
      indicatorTextColor,
      dotBoxShadowDefault,
      dotBoxShadowActive,
      railHeight,
      transformDebounceScale,
      handleSize,
      dotSize
    } = props.$local
    const {
      easeInOutCubicBezier
    } = props.$base
    return [
      cTB('slider', {
        raw: `
          display: block;
          padding: 5px 0;
          position: relative;
          z-index: 0;
          width: calc(100% - 14px);
          margin-left: 7px;
          margin-right: 7px;
          cursor: pointer;
        `
      }, [
        cB('slider-marks', {
          raw: `
            position: absolute;
            top: 14px;
            left: 0;
            right: 0;
          `
        }, [
          cB('slider-mark', {
            raw: `
              position: absolute;
              transform: translateX(-50%);
            `
          })
        ]),
        cM('width-mark', {
          raw: `
            width: calc(100% - 24px);
            margin: 8px 12px 32px 12px;
          `
        }),
        c('&:hover', [
          cB('slider-rail', {
            backgroundColor: railBackgroundColorHover
          }, [
            cE('fill', {
              backgroundColor: railFillBackgroundColorHover
            }),
            cB('slider-dots', [
              cB('slider-dot', {
                boxShadow: dotBoxShadowActive
              })
            ])
          ]),
          cB('slider-handle', {
            boxShadow: handleBoxShadowHover
          })
        ]),
        cM('active', [
          cB('slider-rail', {
            backgroundColor: railBackgroundColorHover
          }, [
            cE('fill', {
              backgroundColor: railFillBackgroundColorHover
            }),
            cB('slider-dots', [
              cB('slider-dot', {
                boxShadow: dotBoxShadowActive
              })
            ])
          ]),
          cB('slider-handle', {
            boxShadow: handleBoxShadowHover
          })
        ]),
        cB('slider-rail', {
          raw: `
            width: 100%;
            position: relative;
          `,
          height: railHeight,
          backgroundColor: railBackgroundColorDefault,
          transition: `background-color .3s ${easeInOutCubicBezier}`,
          borderRadius: `${parseInt(railHeight) / 2}px`
        }, [
          cE('fill', {
            raw: `
              position: absolute;
              top: 0;
              bottom: 0;
              border-radius: ${parseInt(railHeight) / 2}px,
              transition: background-color .3s ${easeInOutCubicBezier};
            `,
            backgroundColor: railFillBackgroundColorDefault
          })
        ]),
        cB('slider-handle', {
          raw: `
            outline: none;
            height: ${handleSize};
            width: ${handleSize};
            border-radius: ${parseInt(handleSize) / 2}px;
            transition: box-shadow .2s ${easeInOutCubicBezier}, background-color .3s ${easeInOutCubicBezier};
            position: absolute;
            top: 0;
            transform: translateX(-50%);
            overflow: hidden;
            cursor: pointer;
          `,
          backgroundColor: handleBackgroundColor,
          boxShadow: handleBoxShadowDefault
        }, [
          c('&:hover', {
            boxShadow: handleBoxShadowHover
          }),
          c('&:hover:focus', {
            boxShadow: handleBoxShadowActive
          }),
          c('&:focus', {
            boxShadow: handleBoxShadowFocus
          })
        ]),
        cB('slider-dots', {
          raw: `
            position: absolute;
            left: 0;
            top: 50%;
            right: 0;
          `
        }, [
          cB('slider-dot', {
            raw: `
              transition: box-shadow .3s ${easeInOutCubicBezier}, background-color .3s ${easeInOutCubicBezier};
              position: absolute;
              transform: translateX(-50%) translateY(-50%);
              height: ${dotSize};
              width: ${dotSize};
              border-radius: ${parseInt(dotSize) / 2}px;
              overflow: hidden;
            `,
            boxShadow: dotBoxShadowDefault
          })
        ])
      ]),
      cTB('slider-handle-indicator', {
        raw: `
            ${fadeInScaleUpTransition('slider-indicator')},
            transform:${transformDebounceScale};
            font-size: 14px;
            padding: 8px 12px;
            margin-bottom: 12px;
            border-radius: 4px;
          `,
        color: indicatorTextColor,
        backgroundColor: indicatorBackgroundColor,
        boxShadow: indicatorBoxShadow
      })
    ]
  }
])
