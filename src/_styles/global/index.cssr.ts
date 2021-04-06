import { c } from '../../_utils/cssr'
import commonVariables from '../common/_common'

// All the components need the style
// It is static and won't be changed in the app's lifetime
// If user want to overrides it `n-global-style` is provided
//
// Technically we can remove font-size & font-family to make
// it pure. I'm not sure whether to do it.
export default c('body', `
  margin: 0;
  font-size: ${commonVariables.fontSize};
  font-family: ${commonVariables.fontFamily};
  -webkit-text-size-adjust: 100%;
`, [
  c('input', `
    font-family: inherit;
    font-size: inherit;
  `)
])
