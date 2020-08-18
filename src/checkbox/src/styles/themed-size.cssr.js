import { c, cB, cTB, cM } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const {
      fontSize,
      checkboxSize
    } = props.$local
    const { size } = props.$instance
    return cTB('checkbox',
      [
        cM(`${size}-size`, {
          raw: `
            font-size: ${fontSize[size]};
          `
        }, [
          cB('checkbox-box', {
            raw: `
              height: ${checkboxSize[size]};
              width: ${checkboxSize[size]};
            `
          })
        ])
      ])
  }]
)
