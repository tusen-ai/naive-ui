import { c, cB, cTB, cE, cM } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const {
      fontSize,
      marginLeft,
      marginTop,
      marginBottom
    } = props.$local
    const { actionColor } = props.$local
    const { size } = props.$vm
    const marginBottomSize = marginBottom[size]
    const marginLeftSize = marginLeft[size]
    const marginTopSize = marginTop[size]
    return cTB(
      'card',
      [
        cM(`${size}-size`, {
        }, [
          cM('content-segmented', [
            c('>', [
              cE('content', {
                paddingTop: marginBottomSize
              })
            ])
          ]),
          cM('content-soft-segmented', [
            c('>', [
              cE('content', {
                raw: `
                  margin: 0 ${marginLeftSize};
                  padding: ${marginBottomSize} 0;
                `
              })
            ])
          ]),
          cM('footer-segmented', [
            c('>', [
              cE('footer', {
                paddingTop: marginBottomSize
              })
            ])
          ]),
          cM('footer-soft-segmented', [
            c('>', [
              cE('footer', {
                raw: `
                  padding: ${marginBottomSize} 0;
                  margin: 0 ${marginLeftSize};
                `
              })
            ])
          ]),
          c('>', [
            cB('card-header', {
              raw: `
                padding: ${marginTopSize} ${marginLeftSize} ${marginBottomSize} ${marginLeftSize};
              `
            }, [
              cE('main', {
                fontSize: fontSize[size]
              }),
              cE('extra', {
                fontSize: '14px'
              })
            ]),
            cE('content, footer', {
              padding: `0 ${marginLeftSize} ${marginBottomSize} ${marginLeftSize}`,
              fontSize: '14px'
            }, [
              c('&:first-child', {
                paddingTop: marginBottomSize
              })
            ]),
            cE('action', {
              raw: `
                background-color: ${actionColor};
                padding: ${marginBottomSize} ${marginLeftSize};
                font-size: 14px;
              `
            })
          ])
        ])
      ]
    )
  }
])
