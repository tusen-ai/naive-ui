import { c } from '../../_utils/cssr'
import commonVariables from '../common/_common'

const {
  fontSize,
  fontFamily,
  lineHeight
} = commonVariables

// All the components need the style
// It is static and won't be changed in the app's lifetime
// If user want to overrides it they need to use `n-global-style` is provided
//
// Technically we can remove font-size & font-family & line-height to make
// it pure. However the coding cost doesn't worth it.
//
// -webkit-tap-hilight-color:
// https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-tap-highlight-color
// In some android devices, there will be the style.
export default c('body', `
  margin: 0;
  font-size: ${fontSize};
  font-family: ${fontFamily};
  line-height: ${lineHeight};
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: transparent;
`, [
  c('input', `
    font-family: inherit;
    font-size: inherit;
  `)
])
