import { cTB, c, cB, cM } from '../../../_utils/cssr'
import fadeDownTranstion from '../../../styles/_transitions/fade-down'

export default c([
  ({ props }) => {
    const {
      itemLabelTextColor,
      itemRequiredAsterisk,
      itemFeedbackTextColorError,
      itemFeedbackTextColorWarning,
      itemLabelHeight,
      height
    } = props.$local
    const {
      easeInOutCubicBezier
    } = props.$base
    return [
      cTB('form', {
        width: '100%',
        fontSize: '14px',
        lineHeight: '1.5'
      }, [
        cM('inline', {
          width: '100%',
          display: 'inline-flex',
          alignItems: 'flex-start',
          alignContent: 'space-around'
        }, [
          cB('form-item', {
            width: 'auto'
          }, [
            c('&:last-child', {
              marginRight: 0
            })
          ])
        ])
      ]),
      cTB('form-item', {
        raw: `
          width: 100%;
        `
      }, [
        cM('top-labelled', {
          raw: `
            margin-right: 18px;
          `
        }, [
          cM('no-label', {
            raw: `
              padding-top: ${itemLabelHeight.medium}
            `
          }),
          cB('form-item-label', {
            raw: `
              display: block;
              width: 100%;
              padding-bottom: 8px;
              padding-left: 2px;
            `
          })
        ]),
        cM('left-labelled', {
          raw: `
            display: flex;
            flex-wrap: nowrap;
          `
        }, [
          cB('form-item-label', {
            raw: `
              box-sizing: border-box;
              padding-right: 12px;
              white-space: nowrap;
              flex-shrink: 0;
              flex-grow: 0;
            `
          }),
          cB('form-item-control', {
            raw: `
              flex-grow: 1;
            `
          })
        ]),
        cM('right-label-aligned', [
          cB('form-item-label', {
            raw: `
              text-align: right;
            `
          }, [
            c('&::after', {
              raw: `
                display: none;
              `
            })
          ])
        ]),
        cM('left-label-aligned', [
          cB('form-item-label', {
            raw: `
              text-align: left;
            `
          }, [
            c('&::before', {
              raw: `
                display: none;
              `
            })
          ])
        ]),
        cB('form-item-blank', {
          raw: `
            padding-top: 3px;
            padding-bottom: 3px;
            min-height: ${height.medium};
            display: flex;
            align-items: center;
            position: relative;
          `
        }, [
          cM('error', [
            c('+', [
              cB('form-item-feedback-wrapper', {
                color: itemFeedbackTextColorError
              })
            ])
          ]),
          cM('warning', [
            c('+', [
              cB('form-item-feedback-wrapper', {
                color: itemFeedbackTextColorWarning
              })
            ])
          ])
        ]),
        cM('required', [
          cB('form-item-label', [
            c('&::after, &::before', {
              raw: `
                content: ' *';
              `,
              color: itemRequiredAsterisk
            })
          ])
        ]),
        cB('form-item-label', {
          raw: `
            display: inline-block;
            height: ${itemLabelHeight.medium};
            box-sizing: border-box;
            font-size: 14px;
            transition: color .3s ${easeInOutCubicBezier};
          `,
          color: itemLabelTextColor
        }, [
          c('&::after', {
            raw: `
              transition: color .3s ${easeInOutCubicBezier};
            `
          })

        ]),
        cB('form-item-feedback-wrapper', {
          raw: `
            padding-left: 2px;
            padding-top: 0px;
            box-sizing: border-box;
            min-height: 1.5em;
            font-size: 14px;
            transform-origin: top left;
            line-height: 1.5;
            transition: color .3s ${easeInOutCubicBezier};
          `
        }, [
          cB('form-item-feedback', [
            fadeDownTranstion({
              name: 'form-item-feedback',
              fromOffset: '-3px'
            })
          ])
        ])
      ])
    ]
  }
])
