import { c, cTB, cB, cE, cM, insideModal } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const {
      headerBackgroudColor,
      headerTextColor,
      contentTextColor,
      contentBackgroundColorDefault,
      contentBackgroundColorModal,
      borderColor,
      borderRadius,
      strongFontWeight
    } = props.$local
    const {
      easeInOutCubicBezier
    } = props.$base
    return [
      cTB('descriptions', [
        cM('left-label-placement', [
          cB('descriptions-table-content', [
            c('> *', {
              raw: `
                vertical-align: top;
              `
            })
          ])
        ]),
        cM('left-label-align', [
          c('th', {
            raw: `
              text-align: left;
            `
          })
        ]),
        cM('center-label-align', [
          c('th', {
            raw: `
              text-align: center;
            `
          })
        ]),
        cM('right-label-align', [
          c('th', {
            raw: `
              text-align: right;
            `
          })
        ]),
        cM('bordered', [
          cB('descriptions-table-wrapper', {
            raw: `
              border-radius: ${borderRadius};
              overflow: hidden;
            `,
            background: contentBackgroundColorDefault,
            border: `1px solid ${borderColor}`
          }, [
            cB('descriptions-table', [
              cB('descriptions-table-row', [
                c('&:not(:last-child)', [
                  cB('descriptions-table-content', {
                    borderBottom: `1px solid ${borderColor}`
                  }),
                  cB('descriptions-table-header', {
                    backgroundClip: 'padding-box',
                    borderBottom: `1px solid ${borderColor}`
                  })
                ]),
                cB('descriptions-table-header', {
                  raw: `
                    font-weight: 400;
                  `,
                  backgroundColor: headerBackgroudColor
                }, [
                  c('&:not(:last-child)', {
                    borderRight: `1px solid ${borderColor}`
                  })
                ]),
                cB('descriptions-table-content', [
                  c('&:not(:last-child)', {
                    borderRight: `1px solid ${borderColor}`
                  })
                ])
              ])
            ])
          ])
        ]),
        cB('descriptions-header', {
          raw: `
            font-weight: ${strongFontWeight};
            font-size: 18px;
            transition: color .3s ${easeInOutCubicBezier};
          `,
          color: headerTextColor
        }),
        cB('descriptions-table-wrapper', {
          raw: `
            transition: border-color .3s ${easeInOutCubicBezier};
          `
        }, [
          cB('descriptions-table', {
            raw: `
              width: 100%;
              border-collapse: separate;
              border-spacing: 0;
              box-sizing: border-box;
            `
          }, [
            cB('descriptions-table-row', {
              raw: `
                box-sizing: border-box;
                transition: border-color .3s ${easeInOutCubicBezier};
              `
            }, [
              cB('descriptions-table-header', {
                raw: `
                  font-weight: ${strongFontWeight};
                  line-height: 1.75;
                  display: table-cell;
                  box-sizing: border-box;
                  transition: color .3s ${easeInOutCubicBezier}, border-color .3s ${easeInOutCubicBezier};
                `,
                color: headerTextColor
              }),
              cB('descriptions-table-content', {
                raw: `
                  vertical-align: top;
                  line-height: 1.75;
                  display: table-cell;
                  box-sizing: border-box;
                  transition: color .3s ${easeInOutCubicBezier}, background-color .3s ${easeInOutCubicBezier}, border-color .3s ${easeInOutCubicBezier};
                  padding: 0 0 16px 0;  
                `,
                color: contentTextColor
              }, [
                cE('content', {
                  raw: `
                    transition: color .3s ${easeInOutCubicBezier};
                    display: inline-block;
                  `,
                  color: contentTextColor
                })
              ]),
              cE('label', {
                raw: `
                  font-weight: ${strongFontWeight};
                  transition: color .3s ${easeInOutCubicBezier};
                  display: inline-block;
                  margin-right: 14px;
                `,
                color: headerTextColor
              }),
              c('&:last-child', [
                cB('descriptions-table-content', {
                  raw: `
                    padding: 0;
                  `
                })
              ])
            ])
          ])
        ])
      ]
      ),
      insideModal(
        cTB('descriptions', [
          cM('bordered', [
            cB('descriptions-table-wrapper', {
              background: contentBackgroundColorModal
            })
          ])
        ])
      )
    ]
  }
])
