import { c } from '../../_utils/cssr'
import commonVariables from '../common/_common'

export default c('body', {
  margin: 0,
  fontSize: commonVariables.fontSize,
  fontFamily: commonVariables.fontFamily
}, [
  c('input', {
    fontFamily: 'inherit',
    fontSize: 'inherit'
  })
])
