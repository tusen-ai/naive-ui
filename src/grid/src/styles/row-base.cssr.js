import { c, cB, cM } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    return cB('row', {
      width: '100%'
    },
    [
      cM('flex', {
        display: 'flex'
      })
    ])
  }
])
