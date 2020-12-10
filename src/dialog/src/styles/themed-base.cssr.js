import { c, cTB, cB, cE, cM, createKey } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const {
      $global: {
        cubicBezierEaseInOut
      },
      $local
    } = props
    const {
      actionSpace,
      contentMargin,
      iconSize,
      iconMargin,
      iconMarginIconTop,
      padding,
      headerTextColor,
      textColor,
      color,
      border,
      borderRadius,
      headerFontWeight,
      headerFontSize,
      closeSize,
      closeMargin,
      closeMarginIconTop,
      closeColor,
      closeColorHover,
      closeColorPressed,
      fontSize
    } = $local
    const dialogStyle = cTB(
      'dialog',
      {
        raw: `
          line-height: 1.5;
          position: relative;
          background: ${color};
          color: ${textColor};
          box-sizing: border-box;
          margin: auto;
          border-radius: ${borderRadius};
          padding: ${padding};
          transition: 
            border-color .3s ${cubicBezierEaseInOut},
            background-color .3s ${cubicBezierEaseInOut},
            color .3s ${cubicBezierEaseInOut};
        `
      },
      [
        [
          'info',
          'success',
          'warning',
          'error'
        ].map(type => cM(`${type}-type`, [
          cE('icon', {
            color: $local[createKey('iconColor', type)]
          })
        ])),
        cM('bordered', {
          border
        }),
        cM('icon-top', [
          cE('close', {
            margin: closeMarginIconTop
          }),
          cE('icon', {
            margin: iconMarginIconTop
          }),
          cE('content', {
            textAlign: 'center'
          }),
          cE('title', {
            justifyContent: 'center'
          }),
          cE('action', {
            justifyContent: 'center'
          })
        ]),
        cM('icon-left', [
          cE('icon', {
            margin: iconMargin
          })
        ]),
        cE('close', {
          raw: `
            font-size: ${closeSize};
            margin: ${padding};
            cursor: pointer;
            position: absolute;
            right: 0;
            top: 0;
            color: ${closeColor};
            margin: ${closeMargin};
            transition: .3s color ${cubicBezierEaseInOut};
          `
        },
        [
          c('&:hover', {
            color: closeColorHover
          }),
          c('&:active', {
            color: closeColorPressed
          })
        ]),
        cE('content', {
          raw: `
            font-size: ${fontSize};
            margin: ${contentMargin};
            position: relative;
          `
        }),
        cE('action', {
          raw: `
            display: flex;
            justify-content: flex-end;
          `
        }, [
          c('> *:not(:last-child)', {
            marginRight: actionSpace
          })
        ]),
        cE('icon', {
          fontSize: iconSize,
          transition: `color .3s ${cubicBezierEaseInOut}`
        }),
        cE('title', {
          raw: `
            transition: color .3s ${cubicBezierEaseInOut};
            display: flex;
            align-items: center;
            font-size: ${headerFontSize};
            font-weight: ${headerFontWeight};
            color: ${headerTextColor}
          `
        }),
        cB('dialog-icon-container', {
          display: 'flex',
          justifyContent: 'center'
        })
      ]
    )
    return [
      dialogStyle,
      cB('modal', [
        cB('dialog', {
          raw: `
            width: 446px;
            max-width: calc(100vw - 32px);
          `
        })
      ])
    ]
  }
])
