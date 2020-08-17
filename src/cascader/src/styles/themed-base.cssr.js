import { c, cTB, cB, cE, cM } from '../../../_utils/cssr'
import fadeInScaleUpTransition from '../../../styles/_transitions/fade-in-scale-up'

export default
c([
  ({ props }) => {
    const base = props.$base
    const easeInOutCubicBezier = base.easeInOutCubicBezier
    const {
      menuColor,
      optionTextColor,
      menuBoxShadow,
      menuBorderColor,
      menuTrackingRectColor,
      optionArrowColor,
      itemCheckMarkColor,
      transformDebounceScale,
      borderRadius
    } = props.$local
    return cTB(
      'cascader-menu',
      {
        raw: `
          transform: ${transformDebounceScale};
          position: relative;
          margin: 4px 0;
          display: flex;
          flex-wrap: nowrap;
          border-radius: ${borderRadius};
          overflow: hidden;
          box-shadow: ${menuBoxShadow};
        `
      },
      [
        fadeInScaleUpTransition({ transformOrigin: 'inherit', duration: '0.2s' }),
        cB('scrollbar', {
          raw: `
            width: 100%;
          `
        }),
        cB('cascader-submenu', {
          raw: `
            position: relative;
            overflow: hidden;
            min-width: 182px;
            background-color: ${menuColor};
          `
        }, [
          cB('scrollbar-content', {
            raw: `
              position: relative;
            `
          }),
          c('&:first-child', {
            raw: `
              border-top-left-radius: ${borderRadius};
              border-bottom-left-radius: ${borderRadius};
            `
          }),
          c('&:last-child', {
            raw: `
              border-top-right-radius: ${borderRadius};
              border-bottom-right-radius: ${borderRadius};
            `
          }),
          c('&:not(:first-child)', {
            raw: `
              border-left: 1px solid ${menuBorderColor};
            `
          })
        ]),
        cB('cascader-option', {
          raw: `
            box-sizing: border-box;
            min-width: 182px;
            background-color: transparent;
            display: flex;
            padding: 0px 24px 0 33px;
            white-space: nowrap;
            position: relative;
            cursor: pointer;
            color: ${optionTextColor.default}
            transition:
              background-color .2s ${easeInOutCubicBezier},
              color 0.2s ${easeInOutCubicBezier};
          `
        }, [
          c('not-leaf', [
            c('&::after', {
              raw: `
                content: '';
                height: 6px;
                width: 3px;
                position: absolute;
                right: 14px;
                transform: rotate(45deg) scale(.5);
                top: calc(50% - 4px);
                opacity: 0;
                transition: 
                  transform .3s ${easeInOutCubicBezier},
                  opacity .3s ${easeInOutCubicBezier};
                  border-right: 1px solid ${itemCheckMarkColor};
                  border-bottom: 1px solid ${itemCheckMarkColor};
              `
            })
          ]),
          cM('single-type', {
            raw: `
              padding: 0px 24px 0 18px;
            `
          }),
          cE('checkbox', {
            raw: `
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              left: 10px;
              display: block;
            `
          }),
          cE('radio', {
            raw: `
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              left: 10px;
              display: block;
            `
          }),
          cE('loading', {
            raw: `
              position: absolute;
              width: 14px;
              height: 14px;
              right: 10px;
              top: 50%;
              transform: translateY(-50%);
              display: block;
            `
          }, [
            fadeInScaleUpTransition({ originalTransform: 'translateY(-50%)' })
          ]),
          cM('selected', {
            raw: `
              color: ${optionTextColor.avtive}
            `
          }, [
            c('&::after', {
              raw: `
                transform: rotate(45deg) scale(1);
                opacity: 1;
              `
            })
          ]),
          cM('active', {
            raw: `
              color: ${optionTextColor.active}
            `
          }),
          cM('disabled', {
            raw: `
              color: ${optionTextColor.disabled};
              cursor: not-allowed;
            `
          }),
          cM('tracked', {
            raw: `
              background-color: ${menuTrackingRectColor};
            `
          }),
          cM('not-leaf', [
            c('&::after', {
              raw: `
                content: '';
                position: absolute;
                width: 5px;
                height: 5px;
                transform: rotate(45deg) translateY(-50%);
                right: 18px;
                top: 50%;
                opacity: 1;
                transition: opacity .3s ${easeInOutCubicBezier};
                border-top: 2px solid ${optionArrowColor};
                border-right: 2px solid ${optionArrowColor};
              `
            })
          ]),
          cM('loading', [
            cM('not-leaf', [
              c('&::after', {
                raw: `
                  opacity: 0;
                `
              })
            ])
          ])
        ]),
        cB('base-tracking-rect', [
          cE('body', {
            raw: `
              background-color: ${menuTrackingRectColor} !important;
            `
          })
        ])
      ]
    )
  },
  cB('cascader', {
    raw: `
      width: 100%;
    `
  })
])
