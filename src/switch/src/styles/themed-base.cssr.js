import { c, cE, cM, cTB, cNotM, createKey } from '../../../_utils/cssr'
import { depx, pxfy } from 'seemly'

export default c([
  ({ props }) => {
    const {
      $global: {
        cubicBezierEaseInOut
      },
      $local
    } = props
    const {
      railColor,
      railColorActive,
      buttonBoxShadow,
      buttonColor
    } = $local
    return cTB('switch', {
      raw: `
        vertical-align: middle;
        user-select: none;
        display: inline-flex;
        outline: none;
        justify-content: center;
        align-items: center;
      `
    }, [
      ['small', 'medium', 'large'].map(size => {
        const railHeight = $local[createKey('railHeight', size)]
        const railWidth = $local[createKey('railWidth', size)]
        const buttonHeight = $local[createKey('buttonHeight', size)]
        const buttonWidth = $local[createKey('buttonWidth', size)]
        const buttonWidthPressed = $local[createKey('buttonWidthPressed', size)]
        const offset = pxfy((depx(railHeight) - depx(buttonHeight)) / 2)
        const height = pxfy(Math.max(depx(railHeight), depx(buttonHeight)))
        const width = depx(railHeight) > depx(buttonHeight) ? railWidth : pxfy(
          depx(railWidth) + depx(buttonHeight) - depx(railHeight)
        )
        return cM(`${size}-size`, {
          height,
          width
        }, [
          cE('rail', {
            height: railHeight,
            width: railWidth,
            borderRadius: $local[createKey('railBorderRadius', size)]
          }, [
            c('&::before', {
              top: offset,
              left: offset,
              height: buttonWidth,
              width: buttonWidthPressed,
              maxWidth: buttonWidth,
              borderRadius: $local[createKey('buttonBorderRadius', size)]
            })
          ]),
          cNotM('disabled', [
            cE('rail', [
              c('&:active::before', {
                maxWidth: buttonWidthPressed
              })
            ]),
            cM('active', [
              cE('rail', [
                c('&:active::before', {
                  left: `calc(100% - ${offset} - ${buttonWidthPressed})`
                })
              ])
            ])
          ]),
          cM('active', [
            cE('rail', [
              c('&::before', {
                left: `calc(100% - (${railHeight} + ${buttonWidth}) / 2)`
              })
            ])
          ])
        ])
      }),
      cE('rail', {
        raw: `
          cursor: pointer;
          position: relative;
          transition: background-color .3s ${cubicBezierEaseInOut};
          background-color: ${railColor};
        `
      }, [
        c('&::before', {
          raw: `
            background-color: ${buttonColor};
            box-sizing: border-box;
            cursor: inherit;
            content: "";
            position: absolute;
            transition:
              background-color .3s ${cubicBezierEaseInOut},
              left .3s ${cubicBezierEaseInOut},
              opacity .3s ${cubicBezierEaseInOut},
              max-width .3s ${cubicBezierEaseInOut},
              box-shadow .3s ${cubicBezierEaseInOut};
          `
        }),
        c('&::before', {
          boxShadow: buttonBoxShadow
        })
      ]),
      cM('active', [
        cE('rail', {
          backgroundColor: railColorActive
        })
      ]),
      cM('disabled', [
        cE('rail', {
          raw: `
            cursor: not-allowed;
            opacity: .5;
          `
        })
      ])
    ])
  }
])
