import { c, cE, cM, cTB, cB, insideModal } from '../../../_utils/cssr'

function tableSizeMixin (size, pallete) {
  return cM(`${size}-size`, {
    raw: `
      font-size: ${pallete.fontSize[size]};
    `
  }, [
    cE('th', {
      raw: `
        padding: ${pallete.paddingSize[size]};
      `
    }),
    cE('td', {
      raw: `
        padding: ${pallete.paddingSize[size]};
      `
    })
  ])
}

export default c([
  ({ props }) => {
    const {
      borderColor,
      bodyColor,
      bodyColorModal,
      headerColor,
      headerTextColor,
      bodyTextColor,
      borderRadius,
      strongFontWeight
    } = props.$local
    const {
      easeInOutCubicBezier
    } = props.$base
    return cTB('table', {
      raw: `
        font-variant-numeric: tabular-nums;
        line-height: 1.75;
        font-size: 14px;
        width: 100%;
        border-radius: ${borderRadius} ${borderRadius} 0 0;
        text-align: left;
        border-collapse: separate;
        border-spacing: 0;
        overflow: hidden;
        background-color: ${bodyColor};
        transition:
          background-color .3s ${easeInOutCubicBezier},
          border-color .3s ${easeInOutCubicBezier},
          color .3s ${easeInOutCubicBezier};
      `
    }, [
      ['small', 'medium', 'large'].map(size => tableSizeMixin(size, props.$local)),
      cE('th', {
        raw: `
          background-clip: padding-box;
          white-space: nowrap;
          transition:
            background-color .3s ${easeInOutCubicBezier},
            border-color .3s ${easeInOutCubicBezier},
            color .3s ${easeInOutCubicBezier};
          text-align: inherit;
          padding: 14px 12px;
          vertical-align: inherit;
          text-transform: none;
          border: none;
          font-weight: ${strongFontWeight};
          color: ${headerTextColor};
          background-color: ${headerColor};
          border-color: ${borderColor};
          border-bottom: 1px solid ${borderColor};
          border-right: 1px solid ${borderColor};
        `
      }, [
        c('&:last-child', {
          raw: `
            border-right: none;
          `
        })
      ]),
      cE('td', {
        raw: `
          transition:
            background-color .3s ${easeInOutCubicBezier},
            border-color .3s ${easeInOutCubicBezier},
            color .3s ${easeInOutCubicBezier};
          padding: 12px;
          color: ${bodyTextColor};
          background-color: ${bodyColor};
          border-right: 1px solid ${borderColor};
          border-bottom: 1px solid ${borderColor};
        `
      }, [
        c('&:last-child', {
          raw: `
            border-right: none;
          `
        })
      ]),
      cM('bordered', {
        raw: `
          border: 1px solid ${borderColor};
          border-radius: ${borderRadius};
        `
      }, [
        cE('tr', [
          c('&:last-child', [
            cE('td', {
              raw: `
                border-bottom: none;
              `
            })
          ])
        ])
      ]),
      cM('single-line', [
        cE('th', {
          raw: `
            border-right: none;
          `
        }),
        cE('td', {
          raw: `
            border-right: none;
          `
        })
      ]),
      cM('single-column', [
        cE('td', {
          raw: `
            border-bottom: none;
          `
        })
      ]),
      insideModal(
        cB('table', {
          raw: `
            background-color: ${bodyColorModal};
          `
        }, [
          cE('td', {
            raw: `
              background-color: ${bodyColorModal};
            `
          })
        ])
      )
    ])
  }
])
