import { c, cTB, cM } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const {
      textBackgroundImage
    } = props.$local
    const base = props.$base
    const { strongFontWeight } = base
    return [
      cTB('gradient-text', {
        raw: `
          display: inline-block;
          font-weight: ${strongFontWeight};
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
            background-image: ${textBackgroundImage.primary};
          `
        }),
        cM('success-type', {
          raw: `
            background-image: ${textBackgroundImage.success};
          `
        }),
        cM('warning-type', {
          raw: `
            background-image: ${textBackgroundImage.warning};
          `
        }),
        cM('error-type', {
          raw: `
            background-image: ${textBackgroundImage.error};
          `
        }),
        cM('info-type', {
          raw: `
            background-image: ${textBackgroundImage.info};
          `
        })
      ])]
  }
])
