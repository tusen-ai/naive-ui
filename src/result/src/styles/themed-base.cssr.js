import { cTB, c, cB, cE, cM } from '../../../_utils/cssr'

function createResultStatus (status, colorStatus) {
  return cM(`${status}-status`, [
    cB('result-icon', [
      cB('icon', {
        color: colorStatus[status]
      })
    ])
  ])
}

export default c([
  ({ props }) => {
    const {
      headerTextColor,
      descriptionTextColor,
      iconColorError,
      iconColorSuccess,
      iconColorInfo,
      iconColorWarning,
      lineHeight,
      headerFontWeight
    } = props.$local
    const {
      cubicBezierEaseInOut
    } = props.$base
    const colorStatus = {
      success: iconColorSuccess,
      warning: iconColorWarning,
      info: iconColorInfo,
      error: iconColorError
    }
    return cTB('result', {
      raw: `
        color: ${descriptionTextColor};
        line-height: ${lineHeight};
        font-size: 14px;
        transition:
          color .3s ${cubicBezierEaseInOut};
      `
    }, [
      ['success', 'info', 'warning', 'error'].map(item => createResultStatus(item, colorStatus)),
      cB('result-icon', {
        raw: `
          display: flex;
          justify-content: center;
        `
      }),
      cB('result-content', {
        raw: `
          margin-top: 24px;
        `
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
