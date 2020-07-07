import { cTB, c, cE, cM, cNotM } from '../../../_utils/cssr'
import depx from '../../../_utils/css/depx'
import pxfy from '../../../_utils/css/pxfy'

export default c([
  ({ props }) => {
    const size = props.$instance.size
    const height = props.$local.height[size]
    const fontSize = props.$local.fontSize[size]
    const lineHeight = pxfy(Math.round(depx(fontSize) * 1.5))
    const paddingTop = pxfy((depx(height) - depx(lineHeight)) / 2)
    const roundBorderRadius = pxfy(depx(height) / 2)
    return cTB('input', [
      cM(size + '-size', {
        lineHeight: lineHeight,
        fontSize
      }, [
        cE('input', {
          height
        }),
        cE('input, textarea, textarea-mirror, splitor, placeholder', {
          paddingLeft: '14px',
          paddingRight: '14px',
          lineHeight,
          fontSize,
          paddingTop: paddingTop,
          paddingBottom: paddingTop
        }),
        cE('placeholder', {
          left: '14px',
          right: '14px'
        }),
        cM('suffix, clearable', [
          cM('split', [
            cE('input', [
              cM('second', {
                paddingRight: '38px !important'
              }, [
                c('& +', [
                  cE('placeholder', {
                    right: '38px !important'
                  })
                ])
              ])
            ])
          ]),
          cNotM('split', [
            cE('input', [
              cM('first', {
                paddingRight: '38px !important'
              })
            ]),
            cE('placeholder', {
              right: '38px !important'
            })
          ])
        ]),
        cM('prefix', [
          cNotM('split', [
            cE('placeholder', {
              left: '38px !important'
            })
          ]),
          cM('split', [
            cE('input', [
              cM('first', [
                c('& +', [
                  cE('placeholder', {
                    left: '38px !important'
                  })
                ])
              ])
            ])
          ]),
          cE('input', [
            cM('first', {
              paddingLeft: '38px !important'
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
              paddingLeft: roundBorderRadius,
              paddingRight: roundBorderRadius
            }),
            cE('placeholder', {
              left: roundBorderRadius,
              right: roundBorderRadius
            }),
            cE('border-mask', {
              borderRadius: roundBorderRadius
            })
          ])
        ])
      ])
    ])
  }
])
