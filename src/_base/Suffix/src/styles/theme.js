import lightScheme from '../../../../_styles-in-js/lightStyleScheme.scss'
import darkScheme from '../../../../_styles-in-js/darkStyleScheme.scss'

const light = {
  crossColor: {
    error: {
      hover: lightScheme.errorHoverColor,
      active: lightScheme.errorActiveColor
    },
    warning: {
      hover: lightScheme.warningHoverColor,
      active: lightScheme.warningActiveColor
    }
  },
  arrowColor: {
    error: {
      active: lightScheme.errorHoverColor
    },
    warning: {
      active: lightScheme.warningHoverColor
    }
  }
}

const dark = {
  crossColor: {
    error: {
      hover: darkScheme.errorHoverColor,
      active: darkScheme.errorActiveColor
    },
    warning: {
      hover: darkScheme.warningHoverColor,
      active: darkScheme.warningActiveColor
    }
  },
  arrowColor: {
    error: {
      active: darkScheme.errorHoverColor
    },
    warning: {
      active: darkScheme.warningHoverColor
    }
  }
}

export default {
  fallback: light,
  dark
}
