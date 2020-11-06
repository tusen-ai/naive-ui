import { c, cTB, cB, cE, cM, cNotM } from '../../../_utils/cssr'
import fadeInScaleUpTransition from '../../../_styles/transitions/fade-in-scale-up'

export default c([
  ({ props }) => {
    const {
      transformDebounceScale,
      cubicBezierEaseInOut
    } = props.$base
    const {
      itemTextColor,
      itemTextColorMatched,
      itemSupColor,
      itemSupColorMatch,
      itemColorHover,
      itemColorActive,
      itemBorderRadius,
      panelColor,
      panelTextColor,
      panelIconColor,
      panelHeaderTextColor,
      panelDividerColor,
      panelBoxShadow,
      panelBorderRadius,
      panelHeaderFontWeight,
      pickerTextDecorationColor
    } = props.$local
    return [
      cTB('date-picker', {
        position: 'relative'
      }, [
        cM('invalid', [
          c('input', {
            textDecoration: 'line-through',
            textDecorationColor: pickerTextDecorationColor
          })
        ]),
        cM('start-invalid', [
          c('input:nth-of-type(1)', {
            textDecoration: 'line-through',
            textDecorationColor: pickerTextDecorationColor
          })
        ]),
        cM('end-invalid', [
          c('input:nth-of-type(2)', {
            textDecoration: 'line-through',
            textDecorationColor: pickerTextDecorationColor
          })
        ])
      ]),
      cTB('date-panel', {
        outline: 'none',
        transform: transformDebounceScale,
        marginTop: '4px',
        marginBottom: '4px',
        display: 'grid',
        gridTemplateColumns: '1fr',
        borderRadius: panelBorderRadius,
        backgroundColor: panelColor,
        boxShadow: panelBoxShadow,
        color: panelTextColor
      }, [
        fadeInScaleUpTransition(),
        cB('date-panel-calendar', {
          padding: '4px 12px',
          display: 'grid',
          gridTemplateColumns: '1fr'
        }),
        cM('date', {
          gridTemplateAreas: `
            "calendar"
            "action"
          `
        }, [
          cB('date-panel-calendar', {
            paddingTop: '6px',
            gridArea: 'calendar'
          }),
          cB('date-panel-actions', {
            gridArea: 'action'
          })
        ]),
        cM('daterange', {
          gridTemplateAreas: `
            "start-calendar divider end-calendar"
            "action action action"
          `
        }, [
          cB('date-panel-calendar', {
            paddingTop: '6px'
          }, [
            cM('start', {
              gridArea: 'start-calendar'
            }),
            cM('end', {
              gridArea: 'end-calendar'
            })
          ]),
          cB('date-panel-actions', {
            gridArea: 'action'
          })
        ]),
        cM('datetime', {
          gridTemplateAreas: `
            "head"
            "calendar"
            "action"
          `
        }, [
          cB('date-panel-input-wrapper', {
            gridArea: 'head'
          }),
          cB('date-panel-calendar', {
            gridArea: 'calendar'
          }),
          cB('date-panel-actions', {
            gridArea: 'action'
          })
        ]),
        cM('datetimerange', {
          gridTemplateAreas: `
            "head head head"
            "start-calendar divider end-calendar"
            "action action action"
          `
        }, [
          cB('date-panel-input-wrapper', {
            gridArea: 'head'
          }),
          cB('date-panel-calendar', [
            cM('start', {
              gridArea: 'start-calendar'
            }),
            cM('end', {
              gridArea: 'end-calendar'
            })
          ]),
          cB('date-panel-actions', {
            gridArea: 'action'
          })
        ]),
        cB('date-panel-input-wrapper', {
          raw: `
            box-sizing: border-box;
            width: 100%;
            align-items: center;
            padding: 8px 12px;
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid ${panelDividerColor};
          `
        }, [
          cE('arrow', {
            raw: `
              width: 16px;
              height: 16px;
              margin: 0 8px;
              position: relative;
            `
          }),
          cB('base-icon', {
            raw: `
              position: absolute;
              left: 0;
              right: 0;
              top: 0;
              bottom: 0;
              fill: ${panelIconColor};
            `
          }),
          c('>', [
            cB('input', {
              marginRight: '10px',
              flex: 1,
              width: 0
            }),
            cB('time-picker', {
              zIndex: 1,
              flex: 1,
              width: 0
            })
          ]),
          cB('data-panel-date-input', [
            cM('invalid', [
              c('input', {
                textDecoration: 'line-through',
                textDecorationColor: pickerTextDecorationColor
              })
            ])
          ])
        ]),
        cB('date-panel-month', {
          raw: `
            display: flex;
            box-sizing: border-box;
            align-items: center;
            height: 28px;
            padding: 0 8px;
          `
        }, [
          cE('prev, next, fast-prev, fast-next', {
            raw: `
              line-height: 0;
              cursor: pointer;
              width: 14px;
              height: 14px;
              color: ${panelIconColor};
            `
          }),
          cE('fast-prev, next', {
            marginRight: '10px'
          }),
          cE('month-year', {
            raw: `
              font-size: 14px;
              font-weight: ${panelHeaderFontWeight};
              line-height: 17px;
              flex-grow: 1;
              text-align: center;
              color: ${panelHeaderTextColor};
            `
          })
        ]),
        cB('date-panel-weekdays', {
          raw: `
            display: grid;
            margin: auto;
            grid-template-columns: repeat(7, 38px);
            grid-template-rows: repeat(1, 32px);
            align-items: center;
            justify-items: center;
            margin-bottom: 4px;
            border-bottom: 1px solid ${panelDividerColor}
          `
        }, [
          cE('day', {
            raw: `
              line-height: 15px;
              width: 24px;
              text-align: center;
              font-size: 12px;
              color: ${itemTextColor};
            `
          })
        ]),
        cB('date-panel-dates', {
          raw: `
            margin: auto;
            display: grid;
            grid-template-columns: repeat(7, 38px);
            grid-template-rows: repeat(6, 32px);
            align-items: center;
            justify-items: center;
            flex-wrap: wrap;
          `
        }, [
          cB('date-panel-date', {
            raw: `
              position: relative;
              width: 24px;
              height: 24px;
              line-height: 24px;
              text-align: center;
              font-size: 13px;
              border-radius: ${itemBorderRadius};
              z-index: 0;
              cursor: pointer;
              transition:
                background-color .2s ${cubicBezierEaseInOut},
                color .2s ${cubicBezierEaseInOut};
            `
          }, [
            cM('transition-disabled', {
              transition: 'none !important'
            }),
            cNotM('disabled', [
              cNotM('selected', [
                c('&:hover', {
                  backgroundColor: itemColorHover
                })
              ])
            ]),
            cM('current', [
              c('&::after', {
                raw: `
                  position: absolute;
                  top: 3px;
                  right: 2px;
                  content: "";
                  height: 4px;
                  width: 4px;
                  border-radius: 2px;
                  background-color: ${itemSupColor};
                  transition:
                    background-color .2s ${cubicBezierEaseInOut};
                `
              })
            ]),
            cM('covered', [
              cNotM('selected', [
                c('&::before', {
                  raw: `
                    content: "";
                    z-index: -1;
                    position: absolute;
                    left: -7px;
                    right: -7px;
                    top: 0;
                    bottom: 0;
                    background-color: ${itemColorHover};
                  `
                })
              ])
            ]),
            cM('selected', {
              color: itemTextColorMatched,
              backgroundColor: itemColorActive
            }, [
              c('&::after', {
                backgroundColor: itemSupColorMatch
              })
            ]),
            cM('excluded', {
              opacity: 0.45
            }),
            cM('disabled', {
              cursor: 'not-allowed',
              opacity: 0.45
            })
          ])
        ]),
        cE('vertical-divider', {
          raw: `
            grid-area: divider;
            height: 100%;
            width: 1px;
            background-color: ${panelDividerColor};
          `
        }),
        cB('date-panel-actions', {
          raw: `
            flex: 1;
            padding: 8px 12px;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            border-top: 1px solid ${panelDividerColor};
          `
        }, [
          cB('button', {
            marginLeft: '8px'
          })
        ])
      ])
    ]
  }
])
