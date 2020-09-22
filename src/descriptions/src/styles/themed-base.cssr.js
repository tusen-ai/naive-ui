import { c, cTB, cB, cE, cM, insideModal } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const {
      headerColor,
      headerTextColor,
      headerFontWeight,
      contentTextColor,
      contentColor,
      contentColorModal,
      borderColor,
      borderRadius
    } = props.$local
    const {
      cubicBezierEaseInOut
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
            background: contentColor,
            border: `1px solid ${borderColor}`
          }, [
            cB('descriptions-table', [
              cB('descriptions-table-row', [
                c('&:not(:last-child)', [
                  cB('descriptions-table-content', {
                    borderBottom: `1px solid ${borderColor}`
                  }),
                  cB('descriptions-table-header', {
                    borderBottom: `1px solid ${borderColor}`
                  })
                ]),
                cB('descriptions-table-header', {
                  fontWeight: 400,
                  backgroundClip: 'padding-box',
                  backgroundColor: headerColor
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
            font-weight: ${headerFontWeight};
            font-size: 18px;
            transition: color .3s ${cubicBezierEaseInOut};
          `,
          color: headerTextColor
        }),
        cB('descriptions-table-wrapper', {
          raw: `
            transition:
              background-color .3s ${cubicBezierEaseInOut},
              border-color .3s ${cubicBezierEaseInOut};
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
                transition: border-color .3s ${cubicBezierEaseInOut};
              `
            }, [
              cB('descriptions-table-header', {
                raw: `
                  font-weight: ${headerFontWeight};
                  line-height: 1.75;
                  display: table-cell;
                  box-sizing: border-box;
                  transition:
                    color .3s ${cubicBezierEaseInOut},
                    background-color .3s ${cubicBezierEaseInOut},
                    border-color .3s ${cubicBezierEaseInOut};
                `,
                color: headerTextColor
              }),
              cB('descriptions-table-content', {
                raw: `
                  vertical-align: top;
                  line-height: 1.75;
                  display: table-cell;
                  box-sizing: border-box;
                  transition:
                    color .3s ${cubicBezierEaseInOut},
                    background-color .3s ${cubicBezierEaseInOut},
                    border-color .3s ${cubicBezierEaseInOut};
                  padding: 0 0 16px 0;  
                `,
                color: contentTextColor
              }, [
                cE('content', {
                  raw: `
                    transition: color .3s ${cubicBezierEaseInOut};
                    display: inline-block;
                  `,
                  color: contentTextColor
                })
              ]),
              cE('label', {
                raw: `
                  font-weight: ${headerFontWeight};
                  transition: color .3s ${cubicBezierEaseInOut};
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
              background: contentColorModal
            })
          ])
        ])
      )
    ]
  }
])
