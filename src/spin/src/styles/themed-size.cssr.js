import { c, cM, cB } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const { size } = props.$instance
    const height = props.$local.height[size]
    const width = props.$local.width[size]
    return cB('spin', {
      raw: `
        display: inline-block;
      `
    }, [
      cM(`${size}-size`, {
        height,
        width
      })
    ])
  }
])
