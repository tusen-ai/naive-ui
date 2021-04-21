import { CNode } from 'css-render'
import { c, cB, cE, cM, cNotM, insideModal, insidePopover } from '../../../_utils/cssr'

const fixedColumnStyle = createFixedColumnStyle()

// vars:
// --font-size
// --th-padding
// --td-padding
// --bezier
// --border-radius
// --line-height
// --border-color
// --border-color-modal
// --border-color-popover
// --th-color
// --th-color-hover
// --th-color-modal
// --th-color-hover-modal
// --th-color-popover
// --th-color-hover-popover
// --td-color
// --td-color-hover
// --td-color-modal
// --td-color-hover-modal
// --td-color-popover
// --td-color-hover-popover
// --th-text-color
// --td-text-color
// --th-font-weight
// --th-button-color-hover
// --th-icon-color
// --th-icon-color-active
// --filter-size
// --action-divider-color
// --action-padding
// --action-button-margin
// --pagination-margin
// --empty-padding
export default c([
  cB('data-table', `
    width: 100%;
    font-size: var(--font-size);
    --merged-th-color: var(--th-color);
    --merged-td-color: var(--td-color);
    --merged-border-color: var(--border-color);
    --merged-th-color-hover: var(--th-color-hover);
    --merged-td-color-hover: var(--td-color-hover);
  `, [
    cB('data-table-th', {
      padding: 'var(--th-padding)'
    }),
    cB('data-table-td', {
      padding: 'var(--td-padding)'
    }),
    cB('data-table-empty', `
      padding: var(--empty-padding);
      flex-grow: 1;
      flex-shrink: 0;
      opacity: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: opacity .3s var(--bezier);
    `, [
      cM('hide', {
        opacity: 0
      })
    ]),
    cE('pagination', `
      margin: var(--pagination-margin);
      display: flex;
      justify-content: flex-end;
    `),
    cB('data-table-wrapper', `
      position: relative;
      transition: border-color .3s var(--bezier);
      border-top-left-radius: var(--border-radius);
      border-top-right-radius: var(--border-radius);
      line-height: var(--line-height);
    `),
    cM('single-column', [
      cB('data-table-wrapper', [
        cB('data-table-table', [
          cB('data-table-tr', [
            cB('data-table-td', {
              borderBottom: '0 solid var(--merged-border-color)'
            }, [
              c('&::after, &::before', {
                bottom: '0 !important'
              })
            ])
          ])
        ])
      ])
    ]),
    cNotM('single-line', [
      cB('data-table-wrapper', [
        cB('data-table-table', [
          cB('data-table-th', {
            borderRight: '1px solid var(--merged-border-color)'
          }, [
            cM('last', {
              borderRight: '0 solid var(--merged-border-color)'
            })
          ]),
          cB('data-table-td', {
            borderRight: '1px solid var(--merged-border-color)'
          }, [
            cM('last-col', {
              borderRight: '0 solid var(--merged-border-color)'
            })
          ])
        ])
      ])
    ]),
    cM('bordered', [
      cB('data-table-wrapper', {
        border: '1px solid var(--merged-border-color)',
        borderBottomLeftRadius: 'var(--border-radius)',
        borderBottomRightRadius: 'var(--border-radius)'
      }, [
        cB('data-table-table', [
          cB('data-table-tr', [
            cB('data-table-td', [
              cM('last-row', {
                borderBottom: '0 solid var(--merged-border-color)'
              })
            ])
          ])
        ]),
        cB('data-table-base-table-body', `
          border-bottom-left-radius: calc(var(--border-radius) - 1px);
          border-bottom-right-radius: calc(var(--border-radius) - 1px);
        `)
      ])
    ]),
    cB('data-table-base-table', [
      cM('transition-disabled', [
        cB('data-table-th', [c('&::after, &::before', { transition: 'none' })]),
        cB('data-table-td', [c('&::after, &::before', { transition: 'none' })])
      ])
    ]),
    cM('bottom-bordered', [
      cB('data-table-table', [
        cB('data-table-tr', [
          cB('data-table-td', [
            cM('last-row', {
              borderBottom: '1px solid var(--merged-border-color)'
            })
          ])
        ])
      ])
    ]),
    cB('data-table-table', `
      font-variant-numeric: tabular-nums;
      width: 100%;
      word-wrap: break-word;
      word-break: break-all;
      table-layout: fixed;
      transition: background-color .3s var(--bezier);
      border-collapse: separate;
      border-spacing: 0;
      background-color: var(--merged-td-color)
    `, [
      cB('data-table-thead', {
        transition: 'background-color .3s var(--bezier)',
        backgroundColor: 'var(--merged-th-color)'
      }),
      cB('data-table-tr', {
        boxSizing: 'border-box',
        backgroundClip: 'padding-box',
        transition: 'background-color .3s var(--bezier)'
      }, [
        cB('data-table-td', [
          cM('last-row', {
            borderBottom: '0 solid var(--merged-border-color)'
          }, [
            // make sure there is no overlap between bottom border and
            // fixed column box shadow
            c('&::after', {
              bottom: '0 !important'
            }),
            c('&::before', {
              bottom: '0 !important'
            })
          ])
        ]),
        c('&:hover', {
          backgroundColor: 'var(--merged-td-color-hover)'
        }, [
          cB('data-table-td', {
            backgroundColor: 'var(--merged-td-color-hover)'
          })
        ])
      ]),
      cB('data-table-th', `
        position: relative;
        text-align: start;
        box-sizing: border-box;
        background-color: var(--merged-th-color);
        border-color: var(--merged-border-color);
        border-bottom: 1px solid var(--merged-border-color);
        color: var(--th-text-color);
        transition:
          border-color .3s var(--bezier),
          color .3s var(--bezier),
          background-color .3s var(--bezier);
        font-weight: var(--th-font-weight);
      `, [
        cM('filterable', {
          paddingRight: '36px'
        }),
        fixedColumnStyle,
        cM('selection', `
          padding: 0;
          text-align: center;
          line-height: 0;
          z-index: 3;
        `),
        cE('ellipsis', `
          display: inline-block;
          vertical-align: bottom;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          max-width: 100%;
        `),
        cM('sortable', {
          cursor: 'pointer'
        }, [
          cE('ellipsis', {
            maxWidth: 'calc(100% - 18px)'
          }),
          c('&:hover', {
            backgroundColor: 'var(--merged-th-color-hover)'
          })
        ])
      ]),
      cB('data-table-td', `
        text-align: start;
        box-sizing: border-box;
        border: none;
        background-color: var(--merged-td-color);
        color: var(--td-text-color);
        border-bottom: 1px solid var(--merged-border-color);
        transition:
          box-shadow .3s var(--bezier),
          background-color .3s var(--bezier),
          border-color .3s var(--bezier),
          color .3s var(--bezier);
      `, [
        cM('hover', {
          backgroundColor: 'var(--merged-td-color-hover)'
        }),
        cM('ellipsis', `
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        `),
        cM('selection, expand', `
          text-align: center;
          padding: 0;
          line-height: 0;
        `),
        fixedColumnStyle
      ])
    ]),
    cB('data-table-base-table-header', `
      border-top-left-radius: calc(var(--border-radius) - 1px);
      border-top-right-radius: calc(var(--border-radius) - 1px);
      z-index: 3;
      overflow: scroll;
      flex-shrink: 0;
      transition: border-color .3s var(--bezier);
      scrollbar-width: none;
    `, [
      c('&::-webkit-scrollbar', {
        width: 0,
        height: 0
      }),
      cB('data-table-th', [
        cB('data-table-sorter', `
          height: 14px;
          width: 14px;
          margin-left: 4px;
          position: relative;
          display: inline-flex;
          vertical-align: -0.2em;
          color: var(--th-icon-color);
          transition: 
            transform .3s var(--bezier),
            color .3s var(--bezier);
        `, [
          cM('desc', {
            transform: 'rotate(0)'
          }),
          cM('asc', {
            transform: 'rotate(-180deg)'
          }),
          cM('asc, desc', {
            color: 'var(--th-icon-color-active)'
          })
        ]),
        cB('data-table-filter', `
          position: absolute;
          z-index: auto;
          right: 0;
          width: 36px;
          top: 0;
          bottom: 0;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          transition:
            background-color .3s var(--bezier),
            color .3s var(--bezier);
          font-size: var(--filter-size);
          color: var(--th-icon-color);
        `, [
          c('&:hover', {
            backgroundColor: 'var(--th-button-color-hover)'
          }),
          cM('show', {
            backgroundColor: 'var(--th-button-color-hover)'
          }),
          cM('active', `
            background-color: var(--th-button-color-hover);
            color: var(--th-icon-color-active);
          `)
        ])
      ])
    ]),
    cB('data-table-check-extra', `
      transition: color .3s var(--bezier);
      color: var(--th-icon-color);
      position: absolute;
      font-size: 14px;
      right: -4px;
      top: 50%;
      transform: translateY(-50%);
      z-index: 1;
    `)
  ]),
  cB('data-table-filter-menu', [
    cB('scrollbar', {
      maxHeight: '240px'
    }),
    cE('group', {
      display: 'flex',
      flexDirection: 'column',
      padding: '12px 12px 0 12px'
    }, [
      cB('checkbox', {
        marginBottom: '12px',
        marginRight: 0
      }),
      cB('radio', {
        marginBottom: '12px',
        marginRight: 0
      })
    ]),
    cE('action', `
      padding: var(--action-padding);
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-evenly;
      border-top: 1px solid var(--action-divider-color);
    `, [
      cB('button', [
        c('&:not(:last-child)', {
          margin: 'var(--action-button-margin)'
        }),
        c('&:last-child', {
          marginRight: 0
        })
      ])
    ]),
    cB('divider', {
      margin: '0!important'
    })
  ]),
  insideModal(cB('data-table', `
    --merged-th-color: var(--th-color-modal);
    --merged-td-color: var(--td-color-modal);
    --merged-border-color: var(--border-color-modal);
    --merged-th-color-hover: var(--th-color-hover-modal);
    --merged-td-color-hover: var(--td-color-hover-modal);
  `)),
  insidePopover(cB('data-table', `
    --merged-th-color: var(--th-color-popover);
    --merged-td-color: var(--td-color-popover);
    --merged-border-color: var(--border-color-popover);
    --merged-th-color-hover: var(--th-color-hover-popover);
    --merged-td-color-hover: var(--td-color-hover-popover);
  `))
])

function createFixedColumnStyle (): CNode[] {
  return [
    cM('fixed-left', `
      left: 0;
      position: sticky;
      z-index: 2;
    `, [
      c('&::after', `
        pointer-events: none;
        content: "";
        width: 36px;
        display: inline-block;
        position: absolute;
        top: 0;
        bottom: -1px;
        transition: box-shadow .2s var(--bezier);
        right: -36px;
      `)
    ]),
    cM('fixed-right', {
      right: 0,
      position: 'sticky',
      zIndex: 1
    }, [
      c('&::before', `
        pointer-events: none;
        content: "";
        width: 36px;
        display: inline-block;
        position: absolute;
        top: 0;
        bottom: -1px;
        transition: box-shadow .2s var(--bezier);
        left: -36px;
      `)
    ]),
    cM('shadow-before', [
      c('&::before', {
        boxShadow: 'inset -12px 0 8px -12px rgba(0, 0, 0, .18)'
      })
    ]),
    cM('shadow-after', [
      c('&::after', {
        boxShadow: 'inset 12px 0 8px -12px rgba(0, 0, 0, .18)'
      })
    ])
  ]
}
