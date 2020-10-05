import { cTB, c, cB, cE } from '../../../_utils/cssr'
import fadeInScaleUpTransition from '../../../_styles/transitions/fade-in-scale-up'

export default c([
  ({ props }) => {
    const {
      textColor,
      loaderTextColor,
      loaderColor,
      loaderBorderColor
    } = props.$local
    const {
      cubicBezierEaseInOut,
      fontFamilyMono
    } = props.$base
    return cTB('log', {
      raw: `
        position: relative;
        font-size: 14px;
        box-sizing: border-box;
        color: ${textColor};
        transition:
          border-color .3s ${cubicBezierEaseInOut},
          color .3s ${cubicBezierEaseInOut};
      `
    }, [
      cE('lines', {
        raw: `
          margin: 0;
          white-space: pre-wrap;
        `
      }),
      cE('line', {
        raw: `
          font-family: ${fontFamilyMono};
          margin: 0;
        `
      }),
      cB('log-loader', {
        raw: `
          transition:
            color .3s ${cubicBezierEaseInOut},
            background-color .3s ${cubicBezierEaseInOut},
            border-color .3s ${cubicBezierEaseInOut};
          box-sizing: border-box;
          position: absolute;
          right: 16px;
          top: 8px;
          height: 34px;
          border-radius: 17px;
          line-height: 34px;
          white-space: nowrap;
          overflow: hidden;
          border: 1px solid ${loaderBorderColor};
          color: ${loaderTextColor};
          background-color: ${loaderColor};
        `
      }, [
        fadeInScaleUpTransition(),
        cE('content', {
          raw: `
            display: inline-block;
            vertical-align: bottom;
            line-height: 34px;
            padding-left: 40px;
            padding-right: 20px;
            white-space: nowrap;
          `
        }),
        cB('base-loading', {
          raw: `
            position: absolute;
            left: 12px;
            top: calc(50% - 10px);
            font-size: 20px;
            width: 20px;
            height: 20px;
            display: inline-block;
          `
        })
      ])
    ])
  }
])
