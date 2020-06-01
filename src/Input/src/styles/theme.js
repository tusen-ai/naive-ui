import lightScheme from '../../../_styles-in-js/lightStyleScheme.scss'
import darkScheme from '../../../_styles-in-js/darkStyleScheme.scss'
import { changeColor } from '../../../_utils/color'

const light = {
  error: {
    borderMaskBorderColor: {
      default: lightScheme.errorColor,
      hover: lightScheme.errorHoverColor,
      focus: lightScheme.errorHoverColor
    },
    borderMaskBoxShadow: {
      focus: `0 0 0 2px ${changeColor(lightScheme.errorColor, { alpha: 0.3 })}`
    },
    backgroundColor: {
      focus: lightScheme.baseBackgroundColor
    },
    caretColor: {
      default: lightScheme.errorColor
    }
  },
  warning: {
    borderMaskBorderColor: {
      default: lightScheme.warningColor,
      hover: lightScheme.warningHoverColor,
      focus: lightScheme.warningHoverColor
    },
    borderMaskBoxShadow: {
      focus: `0 0 0 2px ${changeColor(lightScheme.warningColor, { alpha: 0.3 })}`
    },
    backgroundColor: {
      focus: lightScheme.baseBackgroundColor
    },
    caretColor: {
      default: lightScheme.warningColor
    }
  }
}

const dark = {
  error: {
    borderMaskBorderColor: {
      default: darkScheme.errorColor,
      hover: darkScheme.errorHoverColor,
      focus: darkScheme.errorHoverColor
    },
    borderMaskBoxShadow: {
      focus: `0 0 8px 0 ${changeColor(darkScheme.errorColor, { alpha: 0.3 })}`
    },
    backgroundColor: {
      focus: changeColor(darkScheme.errorColor, { alpha: 0.1 })
    },
    caretColor: {
      default: darkScheme.errorColor
    }
  },
  warning: {
    borderMaskBorderColor: {
      default: darkScheme.warningColor,
      hover: darkScheme.warningHoverColor,
      focus: darkScheme.warningHoverColor
    },
    borderMaskBoxShadow: {
      focus: `0 0 8px 0 ${changeColor(darkScheme.warningColor, { alpha: 0.3 })}`
    },
    backgroundColor: {
      focus: changeColor(darkScheme.warningColor, { alpha: 0.1 })
    },
    caretColor: {
      default: darkScheme.warningColor
    }
  }
}

export default {
  fallback: light,
  dark
}
