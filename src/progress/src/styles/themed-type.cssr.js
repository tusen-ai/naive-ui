import { cTB, c, cB, cM, createKey } from '../../../_utils/cssr'

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
    const {
      $vm: {
        status
      },
      $local,
      $global: {
        cubicBezierEaseInOut
      }
    } = props
    const {
      lineBgProcessing,
      textColorCircle
    } = $local
    const iconColor = $local[createKey('iconColor', status)]
    const fillColor = $local[createKey('fillColor', status)]
    return cTB('progress', [
      cM(status, [
        cB('progress-text', {
          color: textColorCircle
        }),
        cB('progress-icon', [
          cB('icon', {
            color: iconColor
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
                background: fillColor
              }, [
                cM('processing', [
                  c('&::after', {
                    content: "''",
                    backgroundImage: lineBgProcessing,
                    animation: `progress-processing-animation 2s ${cubicBezierEaseInOut} infinite`
                  })
                ])
              ])
            ]),
            cB('progress-graph-line-indicator', {
              background: fillColor
            })
          ])
        ])
      ])
    ])
  }
])
