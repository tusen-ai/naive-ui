import { c, cTB, cB, cM, cE } from '../../../_utils/cssr'
import fadeInScaleUpTransition from '../../../styles/_transitions/fade-in-scale-up'

export default c([
  ({ props }) => {
    const {
      suffixColor
    } = props.$local
    return [
      cTB('popover-content', {
        raw: `
          position: relative;
        `
      },
      [
        cB('dropdown-submenu-activator', {
          raw: `
            display: inline-block;
            display: flex;
            align-items: center;
            justify-content: space-between;
          `
        }, [
          cE('arrow', {
            raw: `
              position: relative;
              right: -8px;
              fill: ${suffixColor};
            `
          })
        ]),
        cB('dropdown-menu', {
          raw: `
            outline: none;
          `
        }, [
          cB('base-select-menu', {
            raw: `
              margin-top: 0;
              margin-bottom: 0;
            `
          }, [
            cM('small-size', {
              raw: `
                padding-top: 4px;
                padding-bottom: 4px;
              `
            }, [
              cB('base-select-option', {
                raw: `
                  padding: 0 16px;
                `
              }),
              cB('dropdown-divider', {
                raw: `
                  margin: 0 0;
                `
              }),
              cB('dropdown-submenu-activator', [
                cE('arrow', {
                  raw: `
                    font-size: 16px;
                    margin-left: 12px;
                  `
                })
              ])
            ]),
            cM('medium-size', {
              raw: `
                padding-top: 6px;
                padding-bottom: 6px;
              `
            }, [
              cB('base-select-option', {
                raw: `
                  padding: 0 20px;
                `
              }),
              cB('dropdown-divider', {
                raw: `
                  margin: 0 0;
                `
              }),
              cB('dropdown-submenu-activator', [
                cE('arrow', {
                  raw: `
                    font-size: 16px;
                    margin-left: 16px;
                  `
                })
              ])
            ]),
            cM('large-size', {
              raw: `
                padding-top: 6px;
                padding-bottom: 6px;
              `
            }, [
              cB('base-select-option', {
                raw: `
                  padding: 0 24px;
                `
              }),
              cB('dropdown-divider', {
                raw: `
                  margin: 2px 0;
                `
              }),
              cB('dropdown-submenu-activator', [
                cE('arrow', {
                  raw: `
                    font-size: 16px;
                    margin-left: 20px;
                  `
                })
              ])
            ]),
            cM('huge-size', {
              raw: `
                padding-top: 8px;
                padding-bottom: 8px;
              `
            }, [
              cB('base-select-option', {
                raw: `
                  padding: 0 24px;
                `
              }),
              cB('dropdown-submenu-activator', [
                cE('arrow', {
                  raw: `
                    font-size: 16px;
                    margin-left: 20px;
                  `
                })
              ])
            ])
          ])
        ]),
        cB('dropdown-divider', {
          raw: `
            margin: 2px 0;
          `
        }),
        cB('dropdown-menu-wrapper', {
          raw: `
            position: absolute !important;
          `
        }),
        cB('dropdown-submenu', {
          raw: `
            margin-top: 0;
            margin-left: 6px;
            margin-right: 6px;
          `
        }, [
          fadeInScaleUpTransition()
        ])
      ])
    ]
  }
])
