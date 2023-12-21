import { c, cB, cE, cM, cNotM } from '../../../_utils/cssr'
import { fadeInScaleUpTransition } from '../../../_styles/transitions/fade-in-scale-up.cssr'

// vars:
// --n-bezier

// --n-icon-color-override
// --n-icon-color-disabled-override

// --n-panel-border-radius
// --n-panel-color
// --n-panel-box-shadow
// --n-panel-text-color

// panel header
// --n-panel-header-padding
// --n-panel-header-divider-color

// panel calendar
// --n-calendar-left-padding
// --n-calendar-right-padding
// --n-calendar-title-color-hover
// --n-calendar-title-height
// --n-calendar-title-padding
// --n-calendar-title-font-size
// --n-calendar-title-text-color
// --n-calendar-title-font-weight
// --n-calendar-title-grid-template-columns
// --n-calendar-days-height
// --n-calendar-days-divider-color
// --n-calendar-days-font-size
// --n-calendar-days-text-color
// --n-calendar-divider-color

// panel action
// --n-panel-action-padding
// --n-panel-action-divider-color

// panel item
// --n-item-border-radius
// --n-item-size
// --n-item-cell-width
// --n-item-cell-height
// --n-item-text-color
// --n-item-color-included
// --n-item-color-disabled
// --n-item-color-hover
// --n-item-color-active
// --n-item-font-size
// --n-item-text-color-disabled
// --n-item-text-color-active

// scroll item
// --n-scroll-item-width
// --n-scroll-item-height
// --n-scroll-item-border-radius

// panel arrow
// --n-arrow-size
// --n-arrow-color
export default c([
  cB('date-picker', `
    position: relative;
    z-index: auto;
  `, [
    cB('date-picker-icon', `
      color: var(--n-icon-color-override);
      transition: color .3s var(--n-bezier);
    `),
    cB('icon', `
      color: var(--n-icon-color-override);
      transition: color .3s var(--n-bezier);
    `),
    cM('disabled', [
      cB('date-picker-icon', `
        color: var(--n-icon-color-disabled-override);
      `),
      cB('icon', `
        color: var(--n-icon-color-disabled-override);
      `)
    ])
  ]),
  cB('date-panel', `
    width: fit-content;
    outline: none;
    margin: 4px 0;
    display: grid;
    grid-template-columns: 0fr;
    border-radius: var(--n-panel-border-radius);
    background-color: var(--n-panel-color);
    color: var(--n-panel-text-color);
    user-select: none;
  `, [
    fadeInScaleUpTransition(),
    cM('shadow', `
      box-shadow: var(--n-panel-box-shadow);
    `),
    cB('date-panel-calendar', {
      padding: 'var(--n-calendar-left-padding)',
      display: 'grid',
      gridTemplateColumns: '1fr',
      gridArea: 'left-calendar'
    }, [
      cM('end', {
        padding: 'var(--n-calendar-right-padding)',
        gridArea: 'right-calendar'
      })
    ]),
    cB('date-panel-month-calendar', {
      display: 'flex',
      gridArea: 'left-calendar'
    }, [
      cE('picker-col', `
        min-width: var(--n-scroll-item-width);
        height: calc(var(--n-scroll-item-height) * 6);
        user-select: none;
        -webkit-user-select: none;
      `, [
        c('&:first-child', `
          min-width: calc(var(--n-scroll-item-width) + 4px);
        `, [
          cE('picker-col-item', [
            c('&::before', 'left: 4px;')
          ])
        ]),
        cE('padding', `
          height: calc(var(--n-scroll-item-height) * 5)
        `)
      ]),
      cE('picker-col-item', `
        z-index: 0;
        cursor: pointer;
        height: var(--n-scroll-item-height);
        box-sizing: border-box;
        padding-top: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        transition: 
          color .3s var(--n-bezier),
          background-color .3s var(--n-bezier);
        background: #0000;
        color: var(--n-item-text-color);
      `, [
        c('&::before', `
          z-index: -1;
          content: "";
          position: absolute;
          left: 0;
          right: 4px;
          top: 4px;
          bottom: 0;
          border-radius: var(--n-scroll-item-border-radius);
          transition: 
            background-color .3s var(--n-bezier);
        `),
        cNotM('disabled', [
          c('&:hover::before', `
            background-color: var(--n-item-color-hover);
          `),
          cM('selected', `
            color: var(--n-item-color-active);
          `, [
            c('&::before', 'background-color: var(--n-item-color-hover);')
          ])
        ]),
        cM('disabled', `
          color: var(--n-item-text-color-disabled);
          cursor: not-allowed;
        `, [
          cM('selected', [
            c('&::before', `
              background-color: var(--n-item-color-disabled);
            `)
          ])
        ])
      ])
    ]),
    cM('date', {
      gridTemplateAreas: `
        "left-calendar"
        "footer"
        "action"
      `
    }),
    cM('week', {
      gridTemplateAreas: `
        "left-calendar"
        "footer"
        "action"
      `
    }),
    cM('daterange', {
      gridTemplateAreas: `
        "left-calendar divider right-calendar"
        "footer footer footer"
        "action action action"
      `
    }),
    cM('datetime', {
      gridTemplateAreas: `
        "header"
        "left-calendar"
        "footer"
        "action"
      `
    }),
    cM('datetimerange', {
      gridTemplateAreas: `
        "header header header"
        "left-calendar divider right-calendar"
        "footer footer footer"
        "action action action"
      `
    }),
    cM('month', {
      gridTemplateAreas: `
        "left-calendar"
        "footer"
        "action"
      `
    }),
    cB('date-panel-footer', {
      gridArea: 'footer'
    }),
    cB('date-panel-actions', {
      gridArea: 'action'
    }),
    cB('date-panel-header', {
      gridArea: 'header'
    }),
    cB('date-panel-header', `
      box-sizing: border-box;
      width: 100%;
      align-items: center;
      padding: var(--n-panel-header-padding);
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid var(--n-panel-header-divider-color);
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
      grid-template-columns: var(--n-calendar-title-grid-template-columns);
      align-items: center;
      justify-items: center;
      padding: var(--n-calendar-title-padding);
      height: var(--n-calendar-title-height);
    `, [
      cE('prev, next, fast-prev, fast-next', `
        line-height: 0;
        cursor: pointer;
        width: var(--n-arrow-size);
        height: var(--n-arrow-size);
        color: var(--n-arrow-color);
      `),
      cE('month-year', `
        user-select: none;
        -webkit-user-select: none;
        flex-grow: 1;
        position: relative;
      `, [
        cE('text', `
          font-size: var(--n-calendar-title-font-size);
          line-height: var(--n-calendar-title-font-size);
          font-weight: var(--n-calendar-title-font-weight);
          padding: 6px 8px;
          text-align: center;
          color: var(--n-calendar-title-text-color);
          cursor: pointer;
          transition: background-color .3s var(--n-bezier);
          border-radius: var(--n-panel-border-radius);
        `, [
          cM('active', `
            background-color: var(--n-calendar-title-color-hover);
          `),
          c('&:hover', `
            background-color: var(--n-calendar-title-color-hover);
          `)
        ])
      ])
    ]),
    cB('date-panel-weekdays', `
      display: grid;
      margin: auto;
      grid-template-columns: repeat(7, var(--n-item-cell-width));
      grid-template-rows: repeat(1, var(--n-item-cell-height));
      align-items: center;
      justify-items: center;
      margin-bottom: 4px;
      border-bottom: 1px solid var(--n-calendar-days-divider-color);
    `, [
      cE('day', `
        user-select: none;
        -webkit-user-select: none;
        line-height: 15px;
        width: var(--n-item-size);
        text-align: center;
        font-size: var(--n-calendar-days-font-size);
        color: var(--n-item-text-color);
      `)
    ]),
    cB('date-panel-dates', `
      margin: auto;
      display: grid;
      grid-template-columns: repeat(7, var(--n-item-cell-width));
      grid-template-rows: repeat(6, var(--n-item-cell-height));
      align-items: center;
      justify-items: center;
      flex-wrap: wrap;
    `, [
      cB('date-panel-date', `
        user-select: none;
        -webkit-user-select: none;
        position: relative;
        width: var(--n-item-size);
        height: var(--n-item-size);
        line-height: var(--n-item-size);
        text-align: center;
        font-size: var(--n-item-font-size);
        border-radius: var(--n-item-border-radius);
        z-index: 0;
        cursor: pointer;
        transition:
          background-color .2s var(--n-bezier),
          color .2s var(--n-bezier);
      `, [
        cE('trigger', `
          position: absolute;
          left: calc(var(--n-item-size) / 2 - var(--n-item-cell-width) / 2);
          top: calc(var(--n-item-size) / 2 - var(--n-item-cell-height) / 2);
          width:  var(--n-item-cell-width);
          height:  var(--n-item-cell-height);
        `),
        cM('current', [
          cE('sup', `
            position: absolute;
            top: 2px;
            right: 2px;
            content: "";
            height: 4px;
            width: 4px;
            border-radius: 2px;
            background-color: var(--n-item-color-active);
            transition:
              background-color .2s var(--n-bezier);
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
          transition: background-color .3s var(--n-bezier);
        `),
        cM('covered, start, end', [
          cNotM('excluded', [
            c('&::before', `
              content: "";
              z-index: -2;
              position: absolute;
              left: calc((var(--n-item-size) - var(--n-item-cell-width)) / 2);
              right: calc((var(--n-item-size) - var(--n-item-cell-width)) / 2);
              top: 0;
              bottom: 0;
              background-color: var(--n-item-color-included);
            `),
            c('&:nth-child(7n + 1)::before', {
              borderTopLeftRadius: 'var(--n-item-border-radius)',
              borderBottomLeftRadius: 'var(--n-item-border-radius)'
            }),
            c('&:nth-child(7n + 7)::before', {
              borderTopRightRadius: 'var(--n-item-border-radius)',
              borderBottomRightRadius: 'var(--n-item-border-radius)'
            })
          ])
        ]),
        cM('selected', {
          color: 'var(--n-item-text-color-active)'
        }, [
          c('&::after', {
            backgroundColor: 'var(--n-item-color-active)'
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
            backgroundColor: 'var(--n-panel-color)'
          })
        ]),
        cM('excluded', {
          color: 'var(--n-item-text-color-disabled)'
        }, [
          cM('selected', [
            c('&::after', {
              backgroundColor: 'var(--n-item-color-disabled)'
            })
          ])
        ]),
        cM('disabled', {
          cursor: 'not-allowed',
          color: 'var(--n-item-text-color-disabled)'
        }, [
          cM('covered', [
            c('&::before', {
              backgroundColor: 'var(--n-item-color-disabled)'
            })
          ]),
          cM('selected', [
            c('&::before', {
              backgroundColor: 'var(--n-item-color-disabled)'
            }),
            c('&::after', {
              backgroundColor: 'var(--n-item-color-disabled)'
            })
          ])
        ]),
        cM('week-hovered', [
          c('&::before', `
            background-color: var(--n-item-color-included);
          `),
          c('&:nth-child(7n + 1)::before', `
            border-top-left-radius: var(--n-item-border-radius);
            border-bottom-left-radius: var(--n-item-border-radius);
          `),
          c('&:nth-child(7n + 7)::before', `
            border-top-right-radius: var(--n-item-border-radius);
            border-bottom-right-radius: var(--n-item-border-radius);
          `)
        ]),
        cM('week-selected', `
          color: var(--n-item-text-color-active)
        `, [
          c('&::before', `
            background-color: var(--n-item-color-active);
          `),
          c('&:nth-child(7n + 1)::before', `
            border-top-left-radius: var(--n-item-border-radius);
            border-bottom-left-radius: var(--n-item-border-radius);
          `),
          c('&:nth-child(7n + 7)::before', `
            border-top-right-radius: var(--n-item-border-radius);
            border-bottom-right-radius: var(--n-item-border-radius);
          `)
        ])
      ])
    ]),
    cNotM('week', [
      cB('date-panel-dates', [
        cB('date-panel-date', [
          cNotM('disabled', [
            cNotM('selected', [
              c('&:hover', `
                background-color: var(--n-item-color-hover);
              `)
            ])
          ])
        ])
      ])
    ]),
    cM('week', [
      cB('date-panel-dates', [
        cB('date-panel-date', [
          c('&::before', `
            content: "";
            z-index: -2;
            position: absolute;
            left: calc((var(--n-item-size) - var(--n-item-cell-width)) / 2);
            right: calc((var(--n-item-size) - var(--n-item-cell-width)) / 2);
            top: 0;
            bottom: 0;
            transition: background-color .3s var(--n-bezier);
          `)
        ])
      ])
    ]),
    cE('vertical-divider', `
      grid-area: divider;
      height: 100%;
      width: 1px;
      background-color: var(--n-calendar-divider-color);
    `),
    cB('date-panel-footer', `
      border-top: 1px solid var(--n-panel-action-divider-color);
      padding: var(--n-panel-extra-footer-padding);
    `),
    cB('date-panel-actions', `
      flex: 1;
      padding: var(--n-panel-action-padding);
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid var(--n-panel-action-divider-color);
    `, [
      cE('prefix, suffix', `
        display: flex;
        margin-bottom: -8px;
      `),
      cE('suffix', `
        align-self: flex-end;
      `),
      cE('prefix', `
        flex-wrap: wrap;
      `),
      cB('button', `
        margin-bottom: 8px;
      `, [
        c('&:not(:last-child)', `
          margin-right: 8px;
        `)
      ])
    ])
  ]),
  c('[data-n-date].transition-disabled', {
    transition: 'none !important'
  }, [
    c('&::before, &::after', {
      transition: 'none !important'
    })
  ])
])
