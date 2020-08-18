import { c, cTB, cB, cM } from '../../../_utils/cssr'
import fadeInScaleUpTransition from '../../../styles/_transitions/fade-in-scale-up'
import pxfy from '../../../_utils/css/pxfy'

export default c([
  ({ props }) => {
    const panelWidth = 288
    const {
      transformDebounceScale
    } = props.$base
    const {
      itemTextColor,
      itemTextColorDisabled,
      itemTextColorMatched,
      itemTextColorCurrent,
      itemSupColor,
      itemSupColorMatch,
      itemColorHover,
      itemColorActive,
      panelColor,
      panelTextColor,
      panelIconColor,
      panelHeaderTextColor,
      panelDividerColor,
      panelBoxShadow,
      panelBorderRadius,
      pickerTextDecorationColor
    } = props.$local
    return cTB('date-picker', {
      position: 'relative'
    }, [
      cM('invalid', [
        c('input', {
          textDecoration: 'line-through',
          textDecorationColor: pickerTextDecorationColor
        })
      ]),
      cM('start-invalid', [
        c('input:nth-of-type(1)', {
          textDecoration: 'line-through',
          textDecorationColor: pickerTextDecorationColor
        })
      ]),
      cM('end-invalid', [
        c('input:nth-of-type(2)', {
          textDecoration: 'line-through',
          textDecorationColor: pickerTextDecorationColor
        })
      ]),
      cB('data-panel', {
        outline: 'none',
        transform: transformDebounceScale,
        marginTop: '4px',
        marginBottom: '4px',
        width: pxfy(panelWidth),
        borderRadius: panelBorderRadius,
        backgroundColor: panelColor,
        boxShadow: panelBoxShadow,
        color: panelTextColor
      }, [
        fadeInScaleUpTransition(),
        cB('time-picker', {
          zIndex: 1
        }),
        cB('date-panel-calendar', {
          width: '288px'
        })
      ])
    ])
  }
])
