import { cTB, c, cB, cE, cM, createKey } from '../../../_utils/cssr'

function createResultStatus (status, color) {
  return cM(`${status}-status`, [
    cB('result-icon', {
      color
    })
  ])
}

export default c([
  ({ props }) => {
    const {
      $global: {
        cubicBezierEaseInOut
      },
      $local: {
        headerTextColor,
        descriptionTextColor,
        lineHeight,
        headerFontWeight
      }
    } = props
    const { $local } = props
    return cTB('result', {
      raw: `
        color: ${descriptionTextColor};
        line-height: ${lineHeight};
        font-size: 14px;
        transition:
          color .3s ${cubicBezierEaseInOut};
      `
    }, [
      ['success', 'info', 'warning', 'error']
        .map(status => createResultStatus(status, $local[createKey('iconColor', status)])),
      ['small', 'medium', 'large', 'huge'].map(size => {
        const {
          $local: {
            [createKey('iconSize', size)]: iconSize,
            [createKey('headerFontSize', size)]: headerFontSize,
            [createKey('descriptionFontSize', size)]: descriptionFontSize
          }
        } = props
        return cTB('result',
          [
            cM(`${size}-size`, [
              cB('result-icon', {
                raw: `
              display: flex;
              justify-content: center;
            `
              }, [
                cE('status-image', {
                  width: iconSize
                })
              ]),
              cB('result-header', [
                cE('title', {
                  fontSize: headerFontSize
                }),
                cE('description', {
                  fontSize: descriptionFontSize
                })
              ])
            ])
          ]
        )
      }),
      cB('result-icon', {
        raw: `
          display: flex;
          justify-content: center;
          transition: color .3s ${cubicBezierEaseInOut};
        `
      }),
      cB('result-content', {
        marginTop: '24px'
      }),
      cB('result-footer', {
        raw: `
          margin-top: 24px;
          text-align: center;
        `
      }),
      cB('result-header', [
        cE('title', {
          raw: `
            margin-top: 16px;
            font-weight: ${headerFontWeight};
            transition: color .3s ${cubicBezierEaseInOut};
            text-align: center;
            color: ${headerTextColor};
          `
        }),
        cE('description', {
          raw: `
            margin-top: 4px;
            text-align: center;
          `
        })
      ])
    ])
  }
])
