import { c, cTB, cB, cE, cM, createKey } from '../../../../_utils/cssr'
import { depx, pxfy } from '../../../../_utils/css'
import iconSwitchTransition from '../../../../_styles/transitions/icon-switch'

export default c([
  ({ props }) => {
    const {
      cubicBezierEaseInOut,
      transformDebounceScale
    } = props.$base
    const {
      stepHeaderFontWeight
    } = props.$local
    return cTB('steps', {
      width: '100%',
      display: 'flex'
    }, [
      sizeStyle(props.$local, 'small'),
      sizeStyle(props.$local, 'medium'),
      cB('step-splitor', {
        raw: `
          transition:
            color .3s ${cubicBezierEaseInOut},
            background-color .3s ${cubicBezierEaseInOut};
          height: 1px;
          flex: 1;
          align-self: flex-start;
          margin-left: 12px;
          margin-right: 12px;
        `
      }),
      cB('step-content', {
        flex: 1
      }, [
        cB('step-content-header', {
          raw: `
            transition:
              color .3s ${cubicBezierEaseInOut},
              background-color .3s ${cubicBezierEaseInOut};
            position: relative;
            display: flex;
            font-weight: ${stepHeaderFontWeight};
            margin-left: 9px;
          `
        }, [
          cE('title', {
            whiteSpace: 'nowrap',
            flex: 0
          })
        ]),
        cE('description', {
          raw: `
            transition:
              color .3s ${cubicBezierEaseInOut},
              background-color .3s ${cubicBezierEaseInOut};
            margin-top: 12px;
            margin-left: 9px;
          `
        })
      ]),
      cB('step-indicator', {
        raw: `
          transition:
            background-color .3s ${cubicBezierEaseInOut},
            box-shadow .3s ${cubicBezierEaseInOut};
          display: flex;
          align-items: center;
          justify-content: center;
        `
      }, [
        cB('step-indicator-slot', {
          position: 'relative'
        }, [
          cE('index', {
            raw: `
              display: inline-block;
              text-align: center;
              transition: color .3s ${cubicBezierEaseInOut};
              position: absolute;
              left: 0;
              top: 0;
              transform: ${transformDebounceScale};
            `
          }, [
            iconSwitchTransition()
          ]),
          cB('icon', {
            transition: `color .3s ${cubicBezierEaseInOut}`
          }, [
            iconSwitchTransition()
          ])
        ])
      ]),
      cM('transition-disabled', [
        cB('step-indicator', [
          cB('step-indicator-slot', [
            cE('index', {
              transition: 'none !important'
            })
          ])
        ])
      ]),
      cM('vertical', {
        flexDirection: 'column'
      }, [
        cB('step', {
          marginBottom: '16px'
        }, [
          c('&:last-child', {
            marginBottom: 0
          })
        ]),
        cB('step-indicator', [
          cB('step-splitor', {
            position: 'absolute',
            bottom: '-8px',
            width: '1px',
            margin: '0 !important'
          })
        ]),
        cB('step-content', [
          cE('description', {
            marginTop: '8px'
          })
        ])
      ]),
      cB('step', {
        raw: `
          position: relative;
          display: flex;
          flex: 1;
        `
      }, [
        statusStyle(props.$local, 'finish'),
        statusStyle(props.$local, 'error'),
        statusStyle(props.$local, 'wait'),
        statusStyle(props.$local, 'process'),
        c('&:last-child', [
          cB('step-splitor', {
            display: 'none'
          })
        ])
      ])
    ])
  }
])

function sizeStyle (props, size) {
  const stepHeaderFontSize = props[createKey('stepHeaderFontSize', size)]
  const indicatorSize = props[createKey('indicatorSize', size)]
  const indicatorIconSize = props[createKey('indicatorIconSize', size)]
  const indicatorIndexFontSize = props[createKey('indicatorIndexFontSize', size)]
  const headerMarginTop = pxfy((depx(indicatorSize) - depx(stepHeaderFontSize)) / 2)
  return cM(size + '-size', [
    cB('step-splitor', {
      marginTop: pxfy(depx(indicatorSize) / 2 - depx(headerMarginTop))
    }),
    cM('vertical', [
      cB('step-splitor', {
        left: pxfy(depx(indicatorSize) / 2),
        height: `calc(100% - ${indicatorSize})`
      })
    ]),
    cB('step-content', [
      cB('step-content-header', {
        marginTop: headerMarginTop,
        lineHeight: stepHeaderFontSize,
        fontSize: stepHeaderFontSize
      })
    ]),
    cB('step-indicator', {
      height: indicatorSize,
      width: indicatorSize,
      borderRadius: '50%'
    }, [
      cB('step-indicator-slot', {
        width: indicatorIconSize,
        height: indicatorIconSize,
        fontSize: indicatorIconSize,
        lineHeight: indicatorIconSize
      }, [
        cE('index', {
          fontSize: indicatorIndexFontSize,
          width: indicatorIconSize,
          height: indicatorIconSize,
          lineHeight: indicatorIconSize
        })
      ])
    ])
  ])
}

function statusStyle (props, status) {
  return cM(status, [
    cB('step-splitor', {
      backgroundColor: props[createKey('splitorColor', status)]
    }),
    cB('step-content', [
      cB('step-content-header', {
        color: props[createKey('headerTextColor', status)]
      }),
      cE('description', {
        color: props[createKey('descriptionTextColor', status)]
      })
    ]),
    cB('step-indicator', {
      backgroundColor: props[createKey('indicatorColor', status)],
      boxShadow: `0 0 0 1px ${props[createKey('indicatorBorderColor', status)]}`
    }, [
      cB('step-indicator-slot', [
        cE('index', {
          color: props[createKey('indicatorTextColor', status)]
        }),
        cB('icon', {
          color: props[createKey('indicatorTextColor', status)]
        })
      ])
    ])
  ])
}
