import { changeColor } from 'seemly'
import { c, cB, cE, cM, cNotM } from 'naive-ui'

export function mountSvgDefs (): void {
  if (document.getElementById('naive-ui/tusimple/svg-defs')) return
  const svgDefs = `<defs>
    <linearGradient id="progress-info">
      <stop offset="0%" stop-color="#80c6ff" />
      <stop offset="100%" stop-color="#335fff" />
    </linearGradient>
    <linearGradient id="progress-success">
      <stop offset="0%" stop-color="#AFF25E" />
      <stop offset="100%" stop-color="#4FB233" />
    </linearGradient>
    <linearGradient id="progress-warning">
      <stop offset="0%" stop-color="#F2E93D" />
      <stop offset="100%" stop-color="#FFAC26" />
    </linearGradient>
    <linearGradient id="progress-error">
      <stop offset="0%" stop-color="#FF66BA" />
      <stop offset="100%" stop-color="#D92149" />
    </linearGradient>
  </defs>`
  const svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svgEl.innerHTML = svgDefs
  svgEl.id = 'naive-ui/tusimple/svg-defs'
  document.body.appendChild(svgEl)
}

export const unconfigurableStyle = c([
  cB(
    'base-select-menu',
    {
      overflow: 'hidden'
    },
    [
      cB('base-select-menu-option-wrapper', {
        paddingTop: '4px!important',
        paddingBottom: '4px!important'
      }),
      cB('base-select-option', [
        cM(
          'selected',
          {
            backgroundColor: 'transparent'
          },
          [
            c('&:hover', {
              backgroundColor: 'var(--n-option-color-pending)'
            })
          ]
        )
      ])
    ]
  ),
  cB('base-selection', [
    cB('base-suffix', {
      transition: 'all .3s'
    }),
    cM('active', [
      cB(
        'base-suffix',
        {
          transform: 'translateY(-50%) rotate(180deg)'
        },
        [
          cB('base-suffix__arrow', {
            color: '#4FB233'
          })
        ]
      )
    ])
  ]),
  cB('button', [
    cNotM('disabled', [
      c('&:hover', {
        color: 'var(--n-text-color)'
      })
    ])
  ]),
  cB('cascader-menu', {
    padding: '4px 0'
  }),
  cB('dropdown-menu', {
    overflow: 'hidden'
  }),
  cB('date-panel', [
    cB('date-panel-dates', [
      cB('date-panel-date', [
        cM(
          'current',
          {
            color: '#4FB233'
          },
          [
            cM('disabled', {
              color: 'rgba(79, 178, 51, .5)'
            }),
            cB('date-panel-date__sup', {
              display: 'none'
            })
          ]
        ),
        cM('start, end', [
          c('&:nth-child(7n + 1)::before', {
            left: '0'
          }),
          c('&:nth-child(7n + 7)::before', {
            right: '0'
          })
        ]),
        cM('covered, start, end', [
          cNotM('excluded', [
            c('&:nth-child(7n + 1)::before', {
              left: '0'
            }),
            c('&:nth-child(7n + 7)::before', {
              right: '0'
            })
          ])
        ])
      ])
    ])
  ]),
  cB('data-table', [
    cB('data-table-tr', [
      cNotM('summary', [
        c('&:hover', {
          backgroundColor: 'transparent'
        })
      ])
    ]),
    cB('data-table-td', [
      c('&.n-data-table-td--hover', {
        backgroundColor: 'transparent'
      })
    ]),
    cM('bottom-bordered', [
      cB('data-table-wrapper', [
        cB('data-table-base-table', [
          cB('data-table-base-table-body', {
            borderRadius: 'var(--n-border-radius);'
          })
        ])
      ])
    ]),
    cB('data-table-empty', {
      backgroundColor: '#1E1E1E'
    })
  ]),
  cB('dialog', [
    cE('title', {
      marginTop: '20px',
      lineHeight: '33px'
    }),
    cE('content', {
      lineHeight: '22px'
    })
  ]),
  cB('dynamic-tags', [
    cB('button', {
      height: '24px'
    }),
    cB('input', [
      cM('autosize', {
        minWidth: '68px'
      })
    ])
  ]),
  cB(
    'table',
    {
      borderRadius: 'var(--n-border-radius)'
    },
    [
      c('th', {
        borderRight: '1px solid transparent'
      })
    ]
  ),
  cB('tabs', [
    cB('tabs-bar', {
      height: '4px !important',
      borderRadius: '100px !important',
      transform: 'scaleX(0.395)'
    })
  ]),
  cB('input', [
    cM('textarea', [
      cM('resizable', [
        cB('input-wrapper', {
          margin: '0 5px 5px 0',
          paddingRight: '7px'
        })
      ])
    ])
  ]),
  cB('tag', [
    cE(
      'close',
      {
        borderRadius: '50%'
      },
      [
        c('&:hover', {
          backgroundColor: changeColor('#D7DAE0', { alpha: 0.5 })
        }),
        c('&:hover', {
          backgroundColor: changeColor('#D7DAE0', { alpha: 0.25 })
        })
      ]
    )
  ]),
  cB('time-picker-panel', [
    cB('time-picker-col', [
      cE('item', [
        cM('active', [
          c('&::before', {
            backgroundColor: 'transparent'
          })
        ]),
        c('&:before', {
          right: '0'
        })
      ])
    ]),
    cB(
      'time-picker-actions',
      {
        width: '100%',
        display: 'inline-block',
        textAlign: 'center'
      },
      [
        cB('button', {
          margin: '0 6px'
        })
      ]
    )
  ]),
  cB('tooltip', {
    padding: '8px 16px!important'
  }),
  cB('transfer', [
    cB(
      'transfer-gap',
      {
        width: '56px'
      },
      [
        cB(
          'button',
          {
            width: '32px',
            height: '32px',
            padding: '0'
          },
          [
            c('&:hover', [
              cNotM('disabled', [
                cE('icon', {
                  color: 'var(--n-text-color-hover)'
                })
              ])
            ]),
            cE('border', {
              border: '1px solid #848484'
            }),
            cE('icon', {
              color: '#848484'
            }),
            cM(
              'disabled',
              {
                backgroundColor: 'transparent'
              },
              [
                cE('border', {
                  border: '1px solid #5B5B5B'
                }),
                cE('icon', {
                  color: '#5B5B5B'
                })
              ]
            )
          ]
        )
      ]
    ),
    cB('transfer-list', [
      cB('transfer-list-header', [
        cB('transfer-list-header__checkbox', {
          paddingLeft: '12px',
          paddingRight: '13px'
        }),
        cB('transfer-list-header__extra', {
          marginRight: '12px'
        })
      ]),
      cB('transfer-list-body', [
        cB('transfer-list-flex-container', [
          cB('transfer-list-content', [
            cB('transfer-list-item', [
              cB('transfer-list-item__checkbox', {
                paddingLeft: '12px',
                paddingRight: '13px'
              })
            ])
          ])
        ])
      ])
    ])
  ]),
  cB('tree', [
    cB('tree-node-wrapper', {
      margin: '0 -4px'
    })
  ]),
  cB('message', [
    cE('close', [
      c('&:hover', {
        backgroundColor: changeColor('#D7DAE0', { alpha: 0.5 })
      }),
      c('&:active', {
        backgroundColor: changeColor('#D7DAE0', { alpha: 0.25 })
      })
    ])
  ]),
  cB('progress', [
    cB('progress-graph', [
      cB('progress-graph-line', [
        cB('progress-graph-line-rail', [
          cB('progress-graph-line-fill', {
            background: 'linear-gradient(270deg, #F2E93D 0%, #FFAC26 100%)'
          })
        ])
      ]),
      cB('progress-graph-circle', [
        cB('progress-graph-circle-fill', {
          stroke: 'url(#progress-warning)'
        })
      ])
    ]),
    cM('info', [
      cB('progress-graph-line', [
        cB('progress-graph-line-rail', [
          cB('progress-graph-line-fill', {
            background: 'linear-gradient(270deg, #F2E93D 0%, #FFAC26 100%)'
          })
        ])
      ]),
      cM('circle', [
        cB('progress-graph-circle-fill', {
          stroke: 'url(#progress-warning)'
        })
      ])
    ]),
    cM('success', [
      cB('progress-graph-line', [
        cB('progress-graph-line-rail', [
          cB('progress-graph-line-fill', {
            background: 'linear-gradient(270deg, #AFF25E 0%, #4FB233 100%)'
          })
        ])
      ]),
      cM('circle', [
        cB('progress-graph-circle-fill', {
          stroke: 'url(#progress-success)'
        })
      ])
    ]),
    cM('warning', [
      cB('progress-graph-line', [
        cB('progress-graph-line-rail', [
          cB('progress-graph-line-fill', {
            background: 'linear-gradient(270deg, #FF66BA 0%, #D92149 100%)'
          })
        ])
      ]),
      cM('circle', [
        cB('progress-graph-circle-fill', {
          stroke: 'url(#progress-error)'
        })
      ])
    ]),
    cM('error', [
      cB('progress-graph-line', [
        cB('progress-graph-line-rail', [
          cB('progress-graph-line-fill', {
            background: 'linear-gradient(270deg, #FF66BA 0%, #D92149 100%)'
          })
        ])
      ]),
      cM('circle', [
        cB('progress-graph-circle-fill', {
          stroke: 'url(#progress-error)'
        })
      ])
    ])
  ]),
  cB('switch', [
    cM('active', [
      cE('rail', [
        cE('button', {
          backgroundImage: 'linear-gradient(45deg, #4EB233 0%, #AFF25E 100%)'
        })
      ])
    ]),
    cM('disabled', [
      cE(
        'rail',
        {
          opacity: '1',
          backgroundColor: 'rgba(91, 91, 91, .5)'
        },
        [
          cE('button', {
            backgroundColor: '#5B5B5B',
            backgroundImage: 'unset',
            boxShadow: 'none'
          })
        ]
      ),
      cM('active', [
        cE('rail', [
          cE('button', {
            backgroundColor: '#314A2A'
          })
        ])
      ])
    ]),
    cE(
      'rail',
      {
        overflow: 'visible'
      },
      [
        cE('button', {
          backgroundImage: 'linear-gradient(135deg, #E2E5E9 0%, #999999 100%)'
        })
      ]
    )
  ]),
  cB('upload-file-list', [
    cB('upload-file', [
      cB('upload-file-info', [
        cE('action', [
          cB('button--default-type', {
            color: '#ADADAD'
          })
        ])
      ])
    ])
  ])
])
