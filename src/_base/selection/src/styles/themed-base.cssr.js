import {
  cTB,
  cRB,
  c,
  cB,
  cE,
  cM,
  cNotM,
  createKey,
  insideFormItem
} from '../../../../_utils/cssr'
import { formatLength } from '../../../../_utils'

export default c([
  ({ props }) => {
    const {
      $local,
      $global: { cubicBezierEaseInOut }
    } = props
    const {
      borderRadius,
      color,
      placeholderColor,
      textColor,
      paddingSingle,
      boxShadowFocus,
      boxShadowActive,
      boxShadowHover,
      colorActive,
      caretColor,
      colorDisabled,
      textColorDisabled,
      placeholderColorDisabled,
      border,
      borderFocus,
      borderHover,
      borderActive
    } = $local
    return cTB(
      'base-selection',
      {
        raw: `
          position: relative;
          z-index: auto;
          box-shadow: none;
          width: 100%;
          max-width: 100%;
          display: inline-block;
          vertical-align: bottom;
        `,
        borderRadius
      },
      [
        ['small', 'medium', 'large'].map((size) => {
          const {
            [createKey('height', size)]: height,
            [createKey('fontSize', size)]: fontSize
          } = $local
          return cM(
            size + '-size',
            {
              minHeight: height,
              lineHeight: height,
              fontSize
            },
            [
              cE('placeholder', {
                height,
                lineHeight: height
              }),
              cB('base-selection-label', {
                height,
                lineHeight: height
              }),
              cB(
                'base-selection-tags',
                {
                  minHeight: height
                },
                [
                  cB('base-selection-input-tag', {
                    height: formatLength(height, { c: 1, offset: -6 }),
                    lineHeight: formatLength(height, { c: 1, offset: -6 })
                  })
                ]
              )
            ]
          )
        }),
        cM('bordered', [
          cE('border', {
            border
          })
        ]),
        cE('border, state-border', {
          raw: `
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            pointer-events: none;
          `,
          border,
          borderColor: 'transparent',
          borderRadius,
          transition: `border-color .3s ${cubicBezierEaseInOut}`
        }),
        cE('state-border', {
          zIndex: 1
        }),
        cE('box-shadow', {
          raw: `
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            pointer-events: none;
            z-index: 1;
          `,
          borderRadius,
          transition: `box-shadow .3s ${cubicBezierEaseInOut}`
        }),
        cE('mark', {
          raw: `
            cursor: pointer;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            right: 10px;
          `
        }),
        cM('selected', [
          cE('placeholder', {
            opacity: 0
          })
        ]),
        cE('placeholder', {
          raw: `
            pointer-events: none;
            position: absolute;
            left: 14px;
            top: 0;
            opacity: 1;
          `,
          transition: `color .3s ${cubicBezierEaseInOut}`,
          color: placeholderColor
        }),
        cB(
          'base-selection-tags',
          {
            raw: `
              cursor: pointer;
              outline: none;
              box-sizing: border-box;
              position: relative;
              z-index: auto;
              display: flex;
              padding: 3px 26px 0 14px;
              flex-wrap: wrap;
              align-items: center;
              width: 100%;
              vertical-align: bottom;
            `,
            backgroundColor: color,
            borderRadius,
            transition: `
              color .3s ${cubicBezierEaseInOut},
              box-shadow .3s ${cubicBezierEaseInOut},
              background-color .3s ${cubicBezierEaseInOut}
            `
          },
          [
            cB(
              'tag',
              {
                raw: `
                  margin-right: 7px;
                  margin-bottom: 3px;
                  font-size: 14px;
                  max-width: 100%;
                `
              },
              [
                cE('content', {
                  raw: `
                    text-overflow: ellipsis;
                    overflow: hidden;
                  `
                })
              ]
            )
          ]
        ),
        cB(
          'base-selection-label',
          {
            raw: `
              display: inline-block;
              width: 100%;
              vertical-align: bottom;
              cursor: pointer;
              outline: none;
              z-index: auto;
              box-sizing: border-box;
              position: relative;
            `,
            transition: `
              color .3s ${cubicBezierEaseInOut},
              box-shadow .3s ${cubicBezierEaseInOut},
              background-color .3s ${cubicBezierEaseInOut}
            `,
            borderRadius: borderRadius,
            backgroundColor: color
          },
          [
            cE('input', {
              raw: `
                line-height: inherit;
                outline: none;
                cursor: pointer;
                box-sizing: border-box;
                text-overflow: ellipsis;
                overflow: hidden;
                border:none;
                width: 100%;
                white-space: nowrap;
                padding: ${paddingSingle};
                background-color: transparent;
              `,
              color: textColor,
              transition: `color .3s ${cubicBezierEaseInOut}`
            }),
            cE('placeholder', {
              lineHeight: 'inherit',
              pointerEvents: 'none',
              position: 'absolute',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              padding: '0 26px 0 14px',
              color: placeholderColor,
              transition: `color .3s ${cubicBezierEaseInOut}`
            })
          ]
        ),
        cNotM('disabled', [
          cM('focus', [
            cE('box-shadow', {
              boxShadow: boxShadowFocus
            }),
            cE('state-border', {
              border: borderFocus
            })
          ]),
          cM('active', [
            cE('box-shadow', {
              boxShadow: boxShadowActive
            }),
            cE('state-border', {
              border: borderActive
            }),
            cB('base-selection-label', {
              backgroundColor: colorActive
            }),
            cB('base-selection-tags', {
              backgroundColor: colorActive
            }),
            cB('base-selection-input-tag', {
              display: 'inline-block'
            })
          ]),
          cNotM('active', [
            cRB('base-selection-label', [
              c('&:focus ~', [
                cE('box-shadow', {
                  boxShadow: boxShadowFocus
                }),
                cE('state-border', {
                  border: borderFocus
                })
              ]),
              c('&:hover ~', [
                cE('box-shadow', {
                  boxShadow: boxShadowHover
                }),
                cE('state-border', {
                  border: borderHover
                })
              ])
            ]),
            cRB('base-selection-tags', [
              c('&:focus ~', [
                cE('box-shadow', {
                  boxShadow: boxShadowFocus
                }),
                cE('state-border', {
                  border: borderFocus
                })
              ]),
              c('&:hover ~', [
                cE('box-shadow', {
                  boxShadow: boxShadowHover
                }),
                cE('state-border', {
                  border: borderHover
                })
              ])
            ])
          ])
        ]),
        cM(
          'disabled',
          {
            cursor: 'not-allowed'
          },
          [
            cB(
              'base-selection-label',
              {
                cursor: 'not-allowed',
                backgroundColor: colorDisabled
              },
              [
                cE(
                  'input',
                  {
                    cursor: 'not-allowed',
                    color: textColorDisabled
                  },
                  [
                    cM('placeholder', {
                      color: placeholderColorDisabled
                    }),
                    c('&::placeholder', {
                      color: placeholderColorDisabled
                    })
                  ]
                )
              ]
            ),
            cB('base-selection-tags', {
              cursor: 'now-allowed',
              backgroundColor: colorDisabled
            }),
            cE('placeholder', {
              cursor: 'not-allowed',
              color: placeholderColorDisabled
            })
          ]
        ),
        cB(
          'base-selection-input-tag',
          {
            raw: `
              outline: none;
              display: none;
              position: relative;
              margin-bottom: 3px;
              max-width: 100%;
              vertical-align: bottom;
            `
          },
          [
            cE('input', {
              raw: `
                padding: 0;
                background-color: transparent;
                outline: none;
                border: none;
                max-width: 100%;
                overflow: hidden;
                width: 1em;
                line-height: inherit;
                cursor: pointer;
              `,
              color: textColor,
              caretColor
            }),
            cE('mirror', {
              raw: `
                position: absolute;
                padding-right: 1em;
                left: 0;
                top: 0;
                white-space: pre;
                visibility: hidden;
                user-select: none;
                opacity: 0;
              `
            })
          ]
        )
      ]
    )
  },
  ({ props }) => {
    const { $local } = props
    return ['warning', 'error'].map((status) => {
      return insideFormItem(
        status,
        cTB('base-selection', [
          [
            cE('state-border', {
              border: $local[createKey('border', status)]
            }),
            cNotM('disabled', [
              cM('active', [
                cE('box-shadow', {
                  boxShadow: $local[createKey('boxShadowActive', status)]
                }),
                cE('state-border', {
                  border: $local[createKey('borderActive', status)]
                }),
                cB('base-selection-label', {
                  backgroundColor: $local[createKey('colorActive', status)]
                }),
                cB('base-selection-tags', {
                  backgroundColor: $local[createKey('boxShadowActive', status)]
                })
              ]),
              cNotM('active', [
                cRB('base-selection-label', [
                  c('&:hover ~', [
                    cE('box-shadow', {
                      boxShadow: $local[createKey('boxShadowHover', status)]
                    }),
                    cE('state-border', {
                      border: $local[createKey('borderHover', status)]
                    })
                  ]),
                  c('&:focus ~', [
                    cE('box-shadow', {
                      boxShadow: $local[createKey('boxShadowFocus', status)]
                    }),
                    cE('state-border', {
                      border: $local[createKey('borderFocus', status)]
                    })
                  ])
                ]),
                cRB('base-selection-tags', [
                  c('&:hover ~', [
                    cE('box-shadow', {
                      boxShadow: $local[createKey('boxShadowHover', status)]
                    }),
                    cE('state-border', {
                      border: $local[createKey('borderHover', status)]
                    })
                  ]),
                  c('&:focus ~', [
                    cE('box-shadow', {
                      boxShadow: $local[createKey('boxShadowFocus', status)]
                    }),
                    cE('state-border', {
                      border: $local[createKey('borderHover', status)]
                    })
                  ])
                ]),
                cM('focus', [
                  cE('box-shadow', {
                    boxShadow: $local[createKey('boxShadowFocus', status)]
                  }),
                  cE('state-border', {
                    border: $local[createKey('borderFocus', status)]
                  })
                ])
              ])
            ])
          ]
        ])
      )
    })
  }
])
