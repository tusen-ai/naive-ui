import { c, cTB, cM } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const {
      rotate,
      colorStartPrimary,
      colorEndPrimary,
      colorStartInfo,
      colorEndInfo,
      colorStartWarning,
      colorEndWarning,
      colorStartError,
      colorEndError,
      colorStartSuccess,
      colorEndSuccess,
      fontWeight
    } = props.$local
    const {
      cubicBezierEaseInOut
    } = props.$base
    return cTB('gradient-text', {
      raw: `
        display: inline-block;
        font-weight: ${fontWeight};
        font-size: inherit;
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        white-space: nowrap;
        background-image: linear-gradient(${rotate}, var(--start-stop) 0%, var(--end-stop) 100%);
        transition:
          --start-stop .3s ${cubicBezierEaseInOut},
          --end-stop .3s ${cubicBezierEaseInOut};
      `
    },
    [
      cM('default-type', {
        raw: `
          --start-stop: ${colorStartPrimary};
          --end-stop: ${colorEndPrimary};
        `
      }),
      cM('success-type', {
        raw: `
          --start-stop: ${colorStartSuccess};
          --end-stop: ${colorEndSuccess};
        `
      }),
      cM('warning-type', {
        raw: `
          --start-stop: ${colorStartWarning};
          --end-stop: ${colorEndWarning};
        `
      }),
      cM('error-type', {
        raw: `
          --start-stop: ${colorStartError};
          --end-stop: ${colorEndError};
        `
      }),
      cM('info-type', {
        raw: `
          --start-stop: ${colorStartInfo};
          --end-stop: ${colorEndInfo};
        `
      })
    ])
  }
])
