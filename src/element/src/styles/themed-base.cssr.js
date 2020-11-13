import { kebabCase } from 'lodash-es'
import { c, cTB } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const { $local } = props
    return cTB('element',
      Object.keys($local).reduce((vars, key) => {
        vars[`--${kebabCase(key)}`] = $local[key]
        return vars
      }, {})
    )
  }
])
