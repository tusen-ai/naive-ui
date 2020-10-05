import { c, cB, cTB, cM } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const {
      fontSize,
      checkboxSize
    } = props.$local
    const mergedSize = props.$instance.mergedSize || props.$instance.size
    return cTB('checkbox',
      [
        cM(`${mergedSize}-size`, {
          raw: `
            font-size: ${fontSize[mergedSize]};
          `
        }, [
          cB('checkbox-box', {
            raw: `
              height: ${checkboxSize[mergedSize]};
              width: ${checkboxSize[mergedSize]};
            `
          })
        ])
      ])
  }]
)
