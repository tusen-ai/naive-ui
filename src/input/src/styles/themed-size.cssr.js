import { cTB, c, cE, cM, cNotM, createKey } from '../../../_utils/cssr'
import { depx, pxfy } from '../../../_utils/css'

export default c([
  ({ props }) => {
    const size = props.$instance.mergedSize
    const height = props.$local[createKey('height', size)]
    const fontSize = props.$local[createKey('fontSize', size)]
    const lineHeight = pxfy(Math.round(depx(fontSize) * 1.5))
    const paddingTop = pxfy((depx(height) - depx(lineHeight)) / 2)
    const roundBorderRadius = pxfy(depx(height) / 2)
    const {
      paddingLeft,
      paddingRight,
      paddingIcon
    } = props.$local
    return cTB('input', [
      cM(size + '-size', {
        lineHeight: lineHeight,
        fontSize
      }, [
        cE('input', {
          height
        }),
        cE('input, textarea, textarea-mirror, splitor, placeholder', {
          paddingLeft,
          paddingRight,
          lineHeight,
          fontSize,
          paddingTop: paddingTop,
          paddingBottom: paddingTop
        }),
        cE('placeholder', {
          left: paddingLeft,
          right: paddingRight
        }),
        cM('suffix, clearable', [
          cM('split', [
            cE('input', [
              cM('second', {
                paddingRight: `${paddingIcon} !important`
              }, [
                c('& +', [
                  cE('placeholder', {
                    right: `${paddingIcon} !important`
                  })
                ])
              ])
            ])
          ]),
          cNotM('split', [
            cE('input', [
              cM('first', {
                paddingRight: `${paddingIcon} !important`
              })
            ]),
            cE('placeholder', {
              right: `${paddingIcon} !important`
            })
          ])
        ]),
        cM('prefix', [
          cNotM('split', [
            cE('placeholder', {
              left: `${paddingIcon} !important`
            })
          ]),
          cM('split', [
            cE('input', [
              cM('first', [
                c('& +', [
                  cE('placeholder', {
                    left: `${paddingIcon} !important`
                  })
                ])
              ])
            ])
          ]),
          cE('input', [
            cM('first', {
              paddingLeft: `${paddingIcon} !important`
            })
          ])
        ]),
        cNotM('textarea', {
          height
        }),
        cM('round', [
          cNotM('textarea', {
            borderRadius: roundBorderRadius
          }, [
            cE('input', {
              paddingLeft: paddingLeft,
              paddingRight: paddingRight
            }),
            cE('placeholder', {
              left: paddingLeft,
              right: paddingRight
            }),
            cE('border-mask, border', {
              borderRadius: roundBorderRadius
            })
          ])
        ])
      ])
    ])
  }
])
