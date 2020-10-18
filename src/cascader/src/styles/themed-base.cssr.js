import { c, cTB, cB, cE, cM } from '../../../_utils/cssr'
import fadeInScaleUpTransition from '../../../_styles/transitions/fade-in-scale-up'
import iconSwitchTransition from '../../../_styles/transitions/icon-switch'
import { depx, pxfy } from '../../../_utils/css'

export default
c([
  ({ props }) => {
    const {
      cubicBezierEaseInOut,
      transformDebounceScale
    } = props.$base
    const {
      optionTextColor,
      optionTextColorMatched,
      optionTextColorDisabled,
      optionCheckMarkColor,
      menuColor,
      menuBoxShadow,
      menuBorderColor,
      menuBorderRadius,
      optionColorHover,
      optionHeight,
      optionFontSize
    } = props.$local
    const menuHeight = pxfy(depx(optionHeight) * 6.6)
    return cTB(
      'cascader-menu',
      {
        raw: `
          transform: ${transformDebounceScale};
          position: relative;
          margin: 4px 0;
          display: flex;
          flex-wrap: nowrap;
          border-radius: ${menuBorderRadius};
          overflow: hidden;
          box-shadow: ${menuBoxShadow};
        `
      },
      [
        fadeInScaleUpTransition({ transformOrigin: 'inherit', duration: '0.2s' }),
        cB('scrollbar', {
          // if width not set, cascader select menu's inner scroll area's width is
          // not correct, which won't change after select menu width is set
          raw: `
            width: 100%;
          `
        }),
        cB('cascader-submenu', {
          raw: `
            height: ${menuHeight};
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
              border-top-left-radius: ${menuBorderRadius};
              border-bottom-left-radius: ${menuBorderRadius};
            `
          }),
          c('&:last-child', {
            raw: `
              border-top-right-radius: ${menuBorderRadius};
              border-bottom-right-radius: ${menuBorderRadius};
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
            height: ${optionHeight};
            line-height: ${optionHeight};
            font-size: ${optionFontSize};
            padding: 0 0 0 18px;
            box-sizing: border-box;
            min-width: 182px;
            background-color: transparent;
            display: flex;
            align-items: center;
            white-space: nowrap;
            position: relative;
            cursor: pointer;
            color: ${optionTextColor};
            transition:
              background-color .2s ${cubicBezierEaseInOut},
              color 0.2s ${cubicBezierEaseInOut};
          `
        }, [
          cM('show-prefix', {
            paddingLeft: 0
          }),
          cE('label', {
            flex: 1
          }),
          cE('prefix', {
            width: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }),
          cE('suffix', {
            width: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }),
          cB('cascader-option-icon-placeholder', {
            position: 'relative',
            width: '14px',
            height: '14px'
          }, [
            cB('cascader-option-icon', {
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0
            }, [
              iconSwitchTransition(),
              cM('checkmark', {
                fill: optionCheckMarkColor,
                stroke: optionCheckMarkColor
              }, [
                fadeInScaleUpTransition()
              ]),
              cM('arrow', {
                fill: optionTextColor,
                stroke: optionTextColor
              })
            ])
          ]),
          cM('selected', {
            raw: `
              color: ${optionTextColorMatched}
            `
          }),
          cM('active', {
            color: optionTextColorMatched,
            backgroundColor: optionColorHover
          }),
          cM('pending', {
            backgroundColor: optionColorHover
          }),
          c('&:hover', {
            backgroundColor: optionColorHover
          }),
          cM('disabled', {
            raw: `
              color: ${optionTextColorDisabled};
              background-color: transparent;
              cursor: not-allowed;
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
