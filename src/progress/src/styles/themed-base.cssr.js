import { cTB, c, cB, cE, cM } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const base = props.$base
    const local = props.$local
    return cTB('progress', {
      display: 'inline-block'
    }, [
      cM('line', {
        width: '100%',
        display: 'block'
      }, [
        cB('progress-content', {
          display: 'flex',
          alignItems: 'center'
        }, [
          cB('progress-graph', {
            flex: 1
          })
        ]),
        cB('progress-custom-content', {
          marginLeft: '14px'
        }),
        cB('progress-icon', {
          raw: `
            width: 30px;
            padding-left: 14px;
            height: 18px;
            line-height: 18px;
            font-size: 18px;
          `,
          transition: `
            fill .3s ${base.cubicBezierEaseInOut},
            color .3s ${base.cubicBezierEaseInOut}
          `
        }, [
          cM('as-text', {
            raw: `
              text-align: center;
              width: 40px;
              font-size: 14px;
              padding-left: 4px;
            `
          })
        ])
      ]),
      cM('circle', {
        width: '120px'
      }, [
        cB('progress-custom-content', {
          raw: `
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translateX(-50%) translateY(-50%);
            display: flex;
            align-items: center;
            justify-content: center;
          `
        }),
        cB('progress-text', {
          raw: `
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translateX(-50%) translateY(-50%);
            display: flex;
            align-items: center;
            color: inherit;
            font-size: 36px;
          `,
          transition: `color .3s ${base.cubicBezierEaseInOut}`
        }),
        cB('progress-icon', {
          raw: `
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translateX(-50%) translateY(-50%);
            display: flex;
            align-items: center;
            color: inherit;
            font-size: 36px;
          `
        }),
        cB('progress-text', {
          whiteSpace: 'nowrap',
          fontWeight: base.fontWeightStrong,
          transition: `color .3s ${base.cubicBezierEaseInOut}`
        }, [
          cE('percentage', {
            color: 'inherit',
            fontSize: '28px'
          }),
          cE('unit', {
            color: 'inherit',
            fontSize: '24px',
            marginLeft: '6px'
          })
        ])
      ]),
      cM('multiple-circle', {
        width: '200px',
        color: 'inherit'
      }, [
        cB('progress-text', {
          raw: `
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translateX(-50%) translateY(-50%);
            display: flex;
            align-items: center;
            justify-content: center;
          `,
          transition: `
            color .3s ${base.cubicBezierEaseInOut}
          `
        })
      ]),
      cB('progress-content', {
        position: 'relative'
      }),
      cB('progress-graph', {
        position: 'relative'
      }, [
        cB('progress-graph-circle', [
          c('svg', {
            verticalAlign: 'bottom'
          }),
          cB('progress-graph-circle-fill', {
            transition: `
              stroke .3s ${base.cubicBezierEaseInOut},
              stroke-dasharray .3s ${base.cubicBezierEaseInOut}
            `
          }),
          cB('progress-graph-circle-rail', {
            transition: `stroke .3s ${base.cubicBezierEaseInOut}`,
            overflow: 'hidden',
            stroke: local.railColor
          })
        ]),
        cB('progress-graph-line', [
          cM('indicator-inside', [
            cB('progress-graph-line-rail', {
              height: '21px',
              borderRadius: '10.5px'
            }, [
              cB('progress-graph-line-fill', {
                height: '21px',
                borderRadius: '10.5px'
              }),
              cB('progress-graph-line-indicator', {
                backgroundColor: 'transparent',
                whiteSpace: 'nowrap',
                textAlign: 'right',
                marginLeft: '14px',
                marginRight: '14px',
                height: '21px',
                fontSize: '14px',
                lineHeight: '21px',
                color: local.innerIndicatorTextColor,
                fontWeight: base.fontWeightStrong,
                transition: `color .3s ${base.cubicBezierEaseInOut}`
              })
            ])
          ]),
          cM('indicator-inside-label', {
            height: '21px',
            display: 'flex',
            alignItems: 'center'
          }, [
            cB('progress-graph-line-rail', {
              flex: 1,
              transition: `background-color .3s ${base.cubicBezierEaseInOut}`
            }),
            cB('progress-graph-line-indicator', {
              raw: `
                font-size: 14px;
                transform: translateZ(0);
                display: flex;
                vertical-align: middle;
                height: 21px;
                line-height: 21px;
                padding: 0 10px;
                border-radius: 10.5px;
                position: absolute;
                white-space: nowrap;
              `,
              color: local.innerIndicatorTextColor,
              transition: `
                right .2s ${base.cubicBezierEaseInOut},
                color .3s ${base.cubicBezierEaseInOut},
                background-color .3s ${base.cubicBezierEaseInOut}
              `,
              fontWeight: base.fontWeightStrong
            })
          ]),
          cB('progress-graph-line-rail', {
            raw: `
              position: relative;
              overflow: hidden;
              height: 10px;
              border-radius: 5px;
            `,
            backgroundColor: local.railColor,
            transition: `background-color .3s ${base.cubicBezierEaseInOut}`
          }, [
            cB('progress-graph-line-fill', {
              raw: `
                position: relative;
                border-radius: 5px;
                height: 10px;
                width: 100%;
                max-width: 0%;
              `,
              transition: `
                background-color .3s ${base.cubicBezierEaseInOut},
                max-width .2s ${base.cubicBezierEaseInOut}
              `
            })
          ])
        ])
      ])
    ])
  }
])
