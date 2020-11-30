import { c, cB, cE } from '../../../_utils/cssr'

export default c([
  () => {
    return cB('input-group', {
      raw: `
        display: inline-flex;
        width: 100%;
        flex-wrap: nowrap;
        vertical-align: bottom;
      `
    }, [
      c('>', [
        cB('input', [
          c('&:not(:last-child)', {
            raw: `
              border-top-right-radius: 0!important;
              border-bottom-right-radius: 0!important;
            `
          }, [
            cE('box-shadow, state-border, border', {
              raw: `
                border-top-right-radius: 0!important;
                border-bottom-right-radius: 0!important;
              `
            })
          ]),
          c('&:not(:first-child)', {
            raw: `
              border-top-left-radius: 0!important;
              border-bottom-left-radius: 0!important;
              margin-left: -1px!important;
            `
          }, [
            cE('box-shadow, state-border, border', {
              raw: `
                border-top-left-radius: 0!important;
                border-bottom-left-radius: 0!important;
              `
            })
          ])
        ]),
        cB('input-number', [
          c('&:not(:last-child)', {
            raw: `
              border-top-right-radius: 0!important;
              border-bottom-right-radius: 0!important;
            `
          }, [
            cE('input, add-button, border-mask, border', {
              raw: `
                border-top-right-radius: 0!important;
                border-bottom-right-radius: 0!important;
              `
            }, [
              cB('input-number-button-border-mask', {
                raw: `
                  border-top-right-radius: 0!important;
                  border-bottom-right-radius: 0!important;
                `
              }),
              cB('input-number-button-border', {
                raw: `
                  border-top-right-radius: 0!important;
                  border-bottom-right-radius: 0!important;
                `
              }),
              cB('input-number-button-boundary', {
                raw: `  
                  background-color: transparent !important;
                `
              })
            ])
          ]),
          c('&:not(:first-child)', {
            raw: `
              border-top-left-radius: 0!important;
              border-bottom-left-radius: 0!important;
            `
          }, [
            cE('input, minus-button, border-mask, border', {
              raw: `
                border-top-left-radius: 0!important;
                border-bottom-left-radius: 0!important;
              `
            }, [
              cB('input-number-button-border-mask', {
                raw: `
                  border-top-left-radius: 0!important;
                  border-bottom-left-radius: 0!important;
                `
              }),
              cB('input-number-button-boundary', {
                raw: `
                  background-color: transparent !important;
                `
              })
            ])
          ])
        ]),
        cB('button', [
          c('&:not(:last-child)', {
            raw: `
              border-top-right-radius: 0!important;
              border-bottom-right-radius: 0!important;
            `
          }, [
            cE('border-mask, border', {
              raw: `
                border-top-right-radius: 0!important;
                border-bottom-right-radius: 0!important;
              `
            })
          ]),
          c('&:not(:first-child)', {
            raw: `
              border-top-left-radius: 0!important;
              border-bottom-left-radius: 0!important;
            `
          }, [
            cE('border-mask, border', {
              raw: `
                border-top-left-radius: 0!important;
                border-bottom-left-radius: 0!important;
              `
            })
          ])
        ]),
        c('*', [
          c('&:not(:last-child)', {
            raw: `
              border-top-right-radius: 0!important;
              border-bottom-right-radius: 0!important;
            `
          }, [
            c('>', [
              cB('input', {
                raw: `
                  border-top-right-radius: 0!important;
                  border-bottom-right-radius: 0!important;
                `
              }, [
                cE('box-shadow, state-border, border', {
                  raw: `
                    border-top-right-radius: 0!important;
                    border-bottom-right-radius: 0!important;
                  `
                })
              ]),
              cB('base-selection', [
                cB('base-selection-label', {
                  raw: `
                    border-top-right-radius: 0!important;
                    border-bottom-right-radius: 0!important;
                  `
                }),
                cB('base-selection-tags', {
                  raw: `
                    border-top-right-radius: 0!important;
                    border-bottom-right-radius: 0!important;
                  `
                }),
                cE('box-shadow, border, state-border', {
                  raw: `
                    border-top-right-radius: 0!important;
                    border-bottom-right-radius: 0!important;
                  `
                })
              ])
            ])
          ]),
          c('&:not(:first-child)', {
            raw: `
              margin-left: -1px!important;
              border-top-left-radius: 0!important;
              border-bottom-left-radius: 0!important;
            `
          }, [
            c('>', [
              cB('input', {
                raw: `
                  border-top-left-radius: 0!important;
                  border-bottom-left-radius: 0!important;
                `
              }, [
                cE('box-shadow, border, state-border', {
                  raw: `
                    border-top-left-radius: 0!important;
                    border-bottom-left-radius: 0!important;
                  `
                })
              ]),
              cB('base-selection', [
                cB('base-selection-label', {
                  raw: `
                    border-top-left-radius: 0!important;
                    border-bottom-left-radius: 0!important;
                  `
                }),
                cB('base-selection-tags', {
                  raw: `
                    border-top-left-radius: 0!important;
                    border-bottom-left-radius: 0!important;
                  `
                }),
                cE('box-shadow, border, state-border', {
                  raw: `
                    border-top-left-radius: 0!important;
                    border-bottom-left-radius: 0!important;
                  `
                })
              ])
            ])
          ])
        ])
      ])
    ])
  }
])
