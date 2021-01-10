import { c } from '../../_utils/cssr'
import commonVariables from '../base/_common'

export default c([
  c('body', {
    margin: 0,
    fontSize: commonVariables.fontSize,
    fontFamily: commonVariables.fontFamily
  }),
  c('input', {
    fontSize: 'inherit',
    fontFamily: commonVariables.fontFamily
  })
])
