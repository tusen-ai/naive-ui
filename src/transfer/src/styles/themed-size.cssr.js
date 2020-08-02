import { c, cTB, cB, cM } from '../../../_utils/cssr'
import depx from '../../../_utils/css/depx'
import pxfy from '../../../_utils/css/pxfy'

export default c([
  ({ props }) => {
    const size = props.$instance.syntheticSize
    const height = props.$local.height[size]
    const fontSize = props.$local.fontSize[size]
    return [
      c(`@keyframes transfer-height-collapse--${size}`, {
        raw: `
          0% {
            max-height: ${height};
          }
          100% {
            max-height: 0;
          }
        `
      }),
      c(`@keyframes transfer-height-expand--${size}`, {
        raw: `
          0% {
            max-height: 0;
          }
          100% {
            max-height: ${height};
          }
        `
      }),
      cTB('transfer', [
        cM(size + '-size', [
          cM('filterable', [
            cB('transfer-list', [
              cB('transfer-list-body', {
                height: pxfy(depx(height) * 5.6 + 45)
              })
            ])
          ]),
          cB('transfer-list', [
            cB('transfer-list-header', {
              fontSize,
              height: pxfy(depx(height) + 6)
            }),
            cB('empty', {
              fontSize
            }),
            cB('transfer-list-body', {
              height: pxfy(depx(height) * 5.6)
            }, [
              cB('transfer-list-item', {
                fontSize,
                height,
                maxHeight: height
              }, [
                cM('source', [
                  cM('enter', {
                    animationName: `transfer-height-expand--${size}, transfer-slide-in-from-right`
                  }),
                  cM('leave', {
                    animationName: `transfer-height-collapse--${size}, transfer-slide-out-to-right`
                  })
                ]),
                cM('target', [
                  cM('enter', {
                    animationName: `transfer-height-expand--${size}, transfer-slide-in-from-left`
                  }),
                  cM('leave', {
                    animationName: `transfer-height-collapse--${size}, transfer-slide-out-to-left`
                  })
                ])
              ])
            ])
          ])
        ])
      ])
    ]
  }
])
