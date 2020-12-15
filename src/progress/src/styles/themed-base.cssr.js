import { cTB, c, cB, cE, cM, createKey } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const {
      $global: {
        cubicBezierEaseInOut,
        fontWeightStrong
      },
      $local: {
        railHeight,
        fontSizeCircle,
        railColor,
        iconSizeCircle,
        iconSizeLine,
        textColorCircle,
        textColorLineInner,
        textColorLineOuter,
        fontSize
      }
    } = props
    return cTB('progress', {
      display: 'inline-block'
    }, [
      cB('progress-icon', [
        cB('icon', {
          transition: `color .3s ${cubicBezierEaseInOut}`
        })
      ]),
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
            height: ${iconSizeLine};
            line-height: ${iconSizeLine};
            font-size: ${iconSizeLine};
            transition:
              fill .3s ${cubicBezierEaseInOut},
              color .3s ${cubicBezierEaseInOut};
          `
        }, [
          cM('as-text', {
            raw: `
              color: ${textColorLineOuter};
              text-align: center;
              width: 40px;
              font-size: ${fontSize};
              padding-left: 4px;
              transition: color .3s ${cubicBezierEaseInOut};
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
            color: ${textColorCircle};
            transition: color .3s ${cubicBezierEaseInOut};
          `
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
            font-size: ${iconSizeCircle};
          `
        }),
        cB('progress-text', {
          whiteSpace: 'nowrap',
          fontWeight: fontWeightStrong,
          transition: `color .3s ${cubicBezierEaseInOut}`
        }, [
          cE('percentage', {
            color: 'inherit',
            fontSize: fontSizeCircle
          }),
          cE('unit', {
            color: 'inherit',
            fontSize: fontSizeCircle
          })
        ])
      ]),
      cM('multiple-circle', {
        width: '200px',
        color: 'inherit'
      }, [
        cB('progress-text', {
          raw: `
            color: ${textColorCircle};
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translateX(-50%) translateY(-50%);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: color .3s ${cubicBezierEaseInOut};
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
              opacity .3s ${cubicBezierEaseInOut},
              stroke .3s ${cubicBezierEaseInOut},
              stroke-dasharray .3s ${cubicBezierEaseInOut}
            `
          }, [
            cM('empty', {
              opacity: 0
            })
          ]),
          cB('progress-graph-circle-rail', {
            transition: `stroke .3s ${cubicBezierEaseInOut}`,
            overflow: 'hidden',
            stroke: railColor
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
                fontSize,
                lineHeight: '21px',
                color: textColorLineInner,
                fontWeight: fontWeightStrong,
                transition: `color .3s ${cubicBezierEaseInOut}`
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
              transition: `background-color .3s ${cubicBezierEaseInOut}`
            }),
            cB('progress-graph-line-indicator', {
              raw: `
                font-size: ${fontSize};
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
              color: textColorLineInner,
              transition: `
                right .2s ${cubicBezierEaseInOut},
                color .3s ${cubicBezierEaseInOut},
                background-color .3s ${cubicBezierEaseInOut}
              `,
              fontWeight: fontWeightStrong
            })
          ]),
          cB('progress-graph-line-rail', {
            raw: `
              position: relative;
              overflow: hidden;
              height: ${railHeight};
              border-radius: 5px;
            `,
            backgroundColor: railColor,
            transition: `background-color .3s ${cubicBezierEaseInOut}`
          }, [
            cB('progress-graph-line-fill', {
              raw: `
                position: relative;
                border-radius: 5px;
                height: inherit;
                width: 100%;
                max-width: 0%;
                transition:
                  background-color .3s ${cubicBezierEaseInOut},
                  max-width .2s ${cubicBezierEaseInOut};
              `
            })
          ])
        ])
      ]),
      ['info', 'success', 'warning', 'error', 'default'].map(status => {
        const {
          $local: {
            lineBgProcessing,
            textColorCircle,
            [createKey('iconColor', status)]: iconColor,
            [createKey('fillColor', status)]: fillColor
          },
          $global: {
            cubicBezierEaseInOut
          }
        } = props
        return cM(status, [
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
      })
    ])
  },
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
  })
])
