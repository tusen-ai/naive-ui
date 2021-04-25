import { c, cB, cE, cM, cNotM } from '../../../_utils/cssr'
import fadeInScaleUpTransition from '../../../_styles/transitions/fade-in-scale-up.cssr'

// vars:
// --bezier

// --icon-color
// --icon-color-disabled

// --panel-border-radius
// --panel-color
// --panel-box-shadow
// --panel-text-color

// panel header
// --panel-header-padding
// --panel-header-divider-color

// panel calendar
// --calendar-left-padding
// --calendar-right-padding
// --calendar-title-height
// --calendar-title-padding
// --calendar-title-font-size
// --calendar-title-text-color
// --calendar-title-font-weight
// --calendar-title-grid-template-columns
// --calendar-days-height
// --calendar-days-divider-color
// --calendar-days-font-size
// --calendar-days-text-color
// --calendar-divider-color

// panel action
// --panel-action-padding
// --panel-action-divider-color

// panel item
// --item-border-radius
// --item-size
// --item-cell-width
// --item-cell-height
// --item-text-color
// --item-color-included
// --item-color-disabled
// --item-color-hover
// --item-color-active
// --item-font-size
// --item-text-color-disabled
// --item-text-color-active

// panel arrow
// --arrow-size
// --arrow-color
export default c([
  cB('date-picker', `
    position: relative;
    z-index: auto;
  `, [
    cB('date-picker-icon', `
      color: var(--icon-color);
      opacity: var(--icon-alpha);
      transition:
        color .3s var(--bezier),
        opacity .3s var(--bezier);
    `),
    cM('disabled', [
      cB('date-picker-icon', `
        color: var(--icon-color-disabled);
        opacity: var(--icon-alpha-disabled);
      `)
    ])
  ]),
  cB('date-panel', `
    outline: none;
    margin: 4px 0;
    display: grid;
    grid-template-columns: 1fr;
    border-radius: var(--panel-border-radius);
    background-color: var(--panel-color);
    box-shadow: var(--panel-box-shadow);
    color: var(--panel-text-color);
  `, [
    fadeInScaleUpTransition(),
    cB('date-panel-calendar', {
      padding: 'var(--calendar-left-padding)',
      display: 'grid',
      gridTemplateColumns: '1fr',
      gridArea: 'left-calendar'
    }, [
      cM('end', {
        padding: 'var(--calendar-right-padding)',
        gridArea: 'right-calendar'
      })
    ]),
    cM('date', {
      gridTemplateAreas: `
        "left-calendar"
        "action"
      `
    }),
    cM('daterange', {
      gridTemplateAreas: `
        "left-calendar divider right-calendar"
        "action action action"
      `
    }),
    cM('datetime', {
      gridTemplateAreas: `
        "header"
        "left-calendar"
        "action"
      `
    }),
    cM('datetimerange', {
      gridTemplateAreas: `
        "header header header"
        "left-calendar divider right-calendar"
        "action action action"
      `
    }),
    cB('date-panel-header', {
      gridArea: 'header'
    }),
    cB('date-panel-actions', {
      gridArea: 'action'
    }),
    cB('date-panel-header', `
      box-sizing: border-box;
      width: 100%;
      align-items: center;
      padding: var(--panel-header-padding);
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid var(--panel-header-divider-color);
    `, [
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
      ])
    ]),
    cB('date-panel-month', `
      box-sizing: border-box;
      display: grid;
      grid-template-columns: var(--calendar-title-grid-template-columns);
      align-items: center;
      justify-items: center;
      padding: var(--calendar-title-padding);
      height: var(--calendar-title-height);
    `, [
      cE('prev, next, fast-prev, fast-next', `
        line-height: 0;
        cursor: pointer;
        width: var(--arrow-size);
        height: var(--arrow-size);
        color: var(--arrow-color);
      `),
      cE('month-year', `
        font-size: var(--calendar-title-font-size);
        font-weight: var(--calendar-title-font-weight);
        line-height: 17px;
        flex-grow: 1;
        text-align: center;
        color: var(--calendar-title-text-color);
      `)
    ]),
    cB('date-panel-weekdays', `
      display: grid;
      margin: auto;
      grid-template-columns: repeat(7, var(--item-cell-width));
      grid-template-rows: repeat(1, var(--item-cell-height));
      align-items: center;
      justify-items: center;
      margin-bottom: 4px;
      border-bottom: 1px solid var(--calendar-days-divider-color);
    `, [
      cE('day', `
        line-height: 15px;
        width: var(--item-size);
        text-align: center;
        font-size: var(--calendar-days-font-size);
        color: var(--item-text-color);
      `)
    ]),
    cB('date-panel-dates', `
      margin: auto;
      display: grid;
      grid-template-columns: repeat(7, var(--item-cell-width));
      grid-template-rows: repeat(6, var(--item-cell-height));
      align-items: center;
      justify-items: center;
      flex-wrap: wrap;
    `, [
      cB('date-panel-date', `
        position: relative;
        width: var(--item-size);
        height: var(--item-size);
        line-height: var(--item-size);
        text-align: center;
        font-size: var(--item-font-size);
        border-radius: var(--item-border-radius);
        z-index: 0;
        cursor: pointer;
        transition:
          background-color .2s var(--bezier),
          color .2s var(--bezier);
      `, [
        cM('transition-disabled', {
          transition: 'none !important'
        }, [
          c('&::before, &::after', {
            transition: 'none !important'
          })
        ]),
        cNotM('disabled', [
          cNotM('selected', [
            c('&:hover', {
              backgroundColor: 'var(--item-color-hover)'
            })
          ])
        ]),
        cM('current', [
          cE('sup', `
            position: absolute;
            top: 2px;
            right: 2px;
            content: "";
            height: 4px;
            width: 4px;
            border-radius: 2px;
            background-color: var(--item-color-active);
            transition:
              background-color .2s var(--bezier);
          `)
        ]),
        c('&::after', `
          content: "";
          z-index: -1;
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          border-radius: inherit;
          transition: background-color .3s var(--bezier);
        `),
        cM('covered, start, end', [
          cNotM('excluded', [
            c('&::before', `
              content: "";
              z-index: -2;
              position: absolute;
              left: calc((var(--item-size) - var(--item-cell-width)) / 2);
              right: calc((var(--item-size) - var(--item-cell-width)) / 2);
              top: 0;
              bottom: 0;
              background-color: var(--item-color-included);
            `),
            c('&:nth-child(7n + 1)::before', {
              borderTopLeftRadius: 'var(--item-border-radius)',
              borderBottomLeftRadius: 'var(--item-border-radius)'
            }),
            c('&:nth-child(7n + 7)::before', {
              borderTopRightRadius: 'var(--item-border-radius)',
              borderBottomRightRadius: 'var(--item-border-radius)'
            })
          ])
        ]),
        cM('selected', {
          color: 'var(--item-text-color-active)'
        }, [
          c('&::after', {
            backgroundColor: 'var(--item-color-active)'
          }),
          cM('start', [
            c('&::before', {
              left: '50%'
            })
          ]),
          cM('end', [
            c('&::before', {
              right: '50%'
            })
          ]),
          cE('sup', {
            backgroundColor: 'var(--panel-color)'
          })
        ]),
        cM('excluded', {
          color: 'var(--item-text-color-disabled)'
        }, [
          cM('selected', [
            c('&::after', {
              backgroundColor: 'var(--item-color-disabled)'
            })
          ])
        ]),
        cM('disabled', {
          cursor: 'not-allowed',
          color: 'var(--item-text-color-disabled)'
        }, [
          cM('covered', [
            c('&::before', {
              backgroundColor: 'var(--item-color-disabled)'
            })
          ]),
          cM('selected', [
            c('&::before', {
              backgroundColor: 'var(--item-color-disabled)'
            }),
            c('&::after', {
              backgroundColor: 'var(--item-color-disabled)'
            })
          ])
        ])
      ])
    ]),
    cE('vertical-divider', `
      grid-area: divider;
      height: 100%;
      width: 1px;
      background-color: var(--calendar-divider-color);
    `),
    cB('date-panel-actions', `
      flex: 1;
      padding: var(--panel-action-padding);
      display: flex;
      align-items: center;
      justify-content: flex-end;
      border-top: 1px solid var(--panel-action-divider-color);
    `, [
      cB('button', {
        marginLeft: '8px'
      })
    ])
  ])
])
