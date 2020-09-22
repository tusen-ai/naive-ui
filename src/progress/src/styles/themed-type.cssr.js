import { cTB, c, cB, cM } from '../../../_utils/cssr'

export default c([
  c('@keyframes progress-processing-animation', {
    raw: `
      0% {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 100%;
        opacity: 1;
      }
      66% {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        opacity: 0;
      }
      100% {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        opacity: 0;
      }
    `
  }),
  ({ props }) => {
    const instance = props.$instance
    const status = instance.status
    const base = props.$base
    const derived = props.$derived
    const local = props.$local
    const fillColor = local[status].fillColor
    const outerIndicatorTextColor = local.outerIndicatorTextColor
    const lineBackgroundImageProcessing = local.lineBackgroundImageProcessing
    return cTB('progress', [
      cM(status, [
        cB('progress-text', {
          color: derived.textColorSecondary
        }),
        cB('progress-icon', [
          cB('icon', {
            fill: fillColor
          }),
          cM('as-text', {
            color: outerIndicatorTextColor
          })
        ]),
        cB('progress-graph', [
          cB('progress-graph-circle', [
            cB('progress-graph-circle-fill', {
              stroke: fillColor
            })
          ]),
          cB('progress-graph-line', [
            cB('progress-graph-line-rail', [
              cB('progress-graph-line-fill', {
                backgroundColor: fillColor
              }, [
                cM('processing', [
                  c('&::after', {
                    content: '',
                    backgroundImage: lineBackgroundImageProcessing,
                    animation: `progress-processing-animation 2s ${base.easeInOutCubicBezier} infinite`
                  })
                ])
              ])
            ]),
            cB('progress-graph-line-indicator', {
              backgroundColor: fillColor
            })
          ])
        ])
      ])
    ])
  }
])
