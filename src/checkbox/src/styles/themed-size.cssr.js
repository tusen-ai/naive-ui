import { c, cB, cTB, cM } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const {
      fontSize,
      checkboxSize
    } = props.$local
    const syntheticSize = props.$instance.syntheticSize || props.$instance.size
    return cTB('checkbox',
      [
        cM(`${syntheticSize}-size`, {
          raw: `
            font-size: ${fontSize[syntheticSize]};
          `
        }, [
          cB('checkbox-box', {
            raw: `
              height: ${checkboxSize[syntheticSize]};
              width: ${checkboxSize[syntheticSize]};
            `
          })
        ])
      ])
  }]
)
