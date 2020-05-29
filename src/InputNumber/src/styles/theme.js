import lightScheme from '../../../_styles-in-js/lightStyleScheme.scss'
import darkScheme from '../../../_styles-in-js/darkStyleScheme.scss'
import { changeColor } from '../../../_utils/color'

const light = {
  error: {
    borderMaskBoxShadow: {
      default: `inset 0 0 0 1px ${lightScheme.errorColor}`,
      hover: `inset 0 0 0 1px ${lightScheme.errorHoverColor}`,
      focus: `inset 0 0 0 1px ${lightScheme.errorHoverColor}, 0 0 0 2px ${changeColor(lightScheme.errorHoverColor, { alpha: 0.3 })}`
    },
    backgroundColor: {
      focus: lightScheme.baseBackgroundColor
    }
  },
  warning: {
    borderMaskBoxShadow: {
      default: `inset 0 0 0 1px ${lightScheme.warningColor}`,
      hover: `inset 0 0 0 1px ${lightScheme.warningHoverColor}`,
      focus: `inset 0 0 0 1px ${lightScheme.warningHoverColor}, 0 0 0 2px ${changeColor(lightScheme.warningHoverColor, { alpha: 0.3 })}`
    },
    backgroundColor: {
      focus: lightScheme.baseBackgroundColor
    }
  }
}

const dark = {
  error: {
    borderMaskBoxShadow: {
      default: `inset 0 0 0 1px ${darkScheme.errorColor}`,
      hover: `inset 0 0 0 1px ${darkScheme.errorHoverColor}`,
      focus: `inset 0 0 0 1px ${darkScheme.errorHoverColor}, 0 0 8px 0 ${changeColor(darkScheme.errorHoverColor, { alpha: 0.3 })}`
    },
    backgroundColor: {
      focus: changeColor(darkScheme.errorColor, { alpha: 0.1 })
    }
  },
  warning: {
    borderMaskBoxShadow: {
      default: `inset 0 0 0 1px ${darkScheme.warningColor}`,
      hover: `inset 0 0 0 1px ${darkScheme.warningHoverColor}`,
      focus: `inset 0 0 0 1px ${darkScheme.warningHoverColor}, 0 0 8px 0 ${changeColor(darkScheme.warningHoverColor, { alpha: 0.3 })}`
    },
    backgroundColor: {
      focus: changeColor(darkScheme.warningColor, { alpha: 0.1 })
    }
  }
}

export default {
  fallback: light,
  dark
}
