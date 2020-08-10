import { c, cTB, cM } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const {
      backgroundImagePrimary,
      backgroundImageInfo,
      backgroundImageSuccess,
      backgroundImageWarning,
      backgroundImageError,
      fontWeight
    } = props.$local
    return cTB('gradient-text', {
      raw: `
        display: inline-block;
        font-weight: ${fontWeight};
        font-size: inherit;
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        white-space: nowrap;
      `
    },
    [
      cM('default-type', {
        raw: `
          background-image: ${backgroundImagePrimary};
        `
      }),
      cM('success-type', {
        raw: `
          background-image: ${backgroundImageSuccess};
        `
      }),
      cM('warning-type', {
        raw: `
          background-image: ${backgroundImageWarning};
        `
      }),
      cM('error-type', {
        raw: `
          background-image: ${backgroundImageError};
        `
      }),
      cM('info-type', {
        raw: `
          background-image: ${backgroundImageInfo};
        `
      })
    ])
  }
])
