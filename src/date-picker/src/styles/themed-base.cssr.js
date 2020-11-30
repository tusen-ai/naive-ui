import { c, cTB, cB, cE, cM, cNotM } from '../../../_utils/cssr'
import fadeInScaleUpTransition from '../../../_styles/transitions/fade-in-scale-up'

export default c([
  ({ props }) => {
    const {
      transformDebounceScale,
      cubicBezierEaseInOut
    } = props.$global
    const {
      panelMonthFontSize,
      panelDayFontSize,
      itemFontSize,
      itemTextColor,
      itemTextColorMatched,
      itemSupColor,
      itemSupColorMatch,
      itemColorHover,
      itemColorActive,
      itemBorderRadius,
      panelColor,
      panelTextColor,
      panelArrowButtonColor,
      panelMonthTextColor,
      panelActionDivider,
      panelHeaderDividerColor,
      panelDayDividerColor,
      panelBoxShadow,
      panelBorderRadius,
      panelMonthFontWeight,
      panelActionPadding,
      itemSize,
      itemSpaceWidth,
      itemSpaceHeight,
      panelMonthPadding,
      panelMonthHeight,
      panelDatePaddingDate,
      panelDatePaddingDateTime,
      panelArrowButtonSize,
      panelHeaderPadding,
      panelVerticalDividerColor
    } = props.$local
    return [
      cTB('date-picker', {
        position: 'relative'
      }, [
        cM('invalid', [
          c('input', {
            textDecoration: 'line-through'
          })
        ]),
        cM('start-invalid', [
          c('input:nth-of-type(1)', {
            textDecoration: 'line-through'
          })
        ]),
        cM('end-invalid', [
          c('input:nth-of-type(2)', {
            textDecoration: 'line-through'
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
          padding: panelDatePaddingDateTime,
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
            padding: panelDatePaddingDate,
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
            padding: panelDatePaddingDate
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
            padding: ${panelHeaderPadding};
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid ${panelHeaderDividerColor};
          `
        }, [
          c('>', [
            c('*:not(:last-child)', {
              marginRight: '10px'
            }),
            c('*', {
              flex: 1,
              width: 0
            }),
            cB('time-picker', {
              zIndex: 1
            })
          ]),
          cB('data-panel-date-input', [
            cM('invalid', [
              c('input', {
                textDecoration: 'line-through'
              })
            ])
          ])
        ]),
        cB('date-panel-month', {
          raw: `
            display: flex;
            box-sizing: border-box;
            align-items: center;
            height: ${panelMonthHeight};
            padding: ${panelMonthPadding};
          `
        }, [
          cE('prev, next, fast-prev, fast-next', {
            raw: `
              line-height: 0;
              cursor: pointer;
              width: ${panelArrowButtonSize};
              height: ${panelArrowButtonSize};
              color: ${panelArrowButtonColor};
            `
          }),
          cE('fast-prev, next', {
            marginRight: '10px'
          }),
          cE('month-year', {
            raw: `
              font-size: ${panelMonthFontSize};
              font-weight: ${panelMonthFontWeight};
              line-height: 17px;
              flex-grow: 1;
              text-align: center;
              color: ${panelMonthTextColor};
            `
          })
        ]),
        cB('date-panel-weekdays', {
          raw: `
            display: grid;
            margin: auto;
            grid-template-columns: repeat(7, ${itemSpaceWidth});
            grid-template-rows: repeat(1, ${itemSpaceHeight});
            align-items: center;
            justify-items: center;
            margin-bottom: 4px;
            border-bottom: 1px solid ${panelDayDividerColor}
          `
        }, [
          cE('day', {
            raw: `
              line-height: 15px;
              width: ${itemSize};
              text-align: center;
              font-size: ${panelDayFontSize};
              color: ${itemTextColor};
            `
          })
        ]),
        cB('date-panel-dates', {
          raw: `
            margin: auto;
            display: grid;
            grid-template-columns: repeat(7, ${itemSpaceWidth});
            grid-template-rows: repeat(6, ${itemSpaceHeight});
            align-items: center;
            justify-items: center;
            flex-wrap: wrap;
          `
        }, [
          cB('date-panel-date', {
            raw: `
              position: relative;
              width: ${itemSize};
              height: ${itemSize};
              line-height: ${itemSize};
              text-align: center;
              font-size: ${itemFontSize};
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
                    left: calc((${itemSize} - ${itemSpaceWidth}) / 2);
                    right: calc((${itemSize} - ${itemSpaceWidth}) / 2);
                    top: 0;
                    bottom: 0;
                    background-color: ${itemColorHover};
                  `
                }),
                c('&:nth-child(7n + 1)::before', {
                  borderTopLeftRadius: itemBorderRadius,
                  borderBottomLeftRadius: itemBorderRadius
                }),
                c('&:nth-child(7n + 7)::before', {
                  borderTopRightRadius: itemBorderRadius,
                  borderBottomRightRadius: itemBorderRadius
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
            background-color: ${panelVerticalDividerColor};
          `
        }),
        cB('date-panel-actions', {
          raw: `
            flex: 1;
            padding: ${panelActionPadding};
            display: flex;
            align-items: center;
            justify-content: flex-end;
            border-top: 1px solid ${panelActionDivider};
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
