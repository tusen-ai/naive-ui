import lightScheme from '../../../../_styles-in-js/lightStyleScheme.scss'
import darkScheme from '../../../../_styles-in-js/darkStyleScheme.scss'

const light = {
  error: {
    crossColor: {
      hover: lightScheme.errorHoverColor,
      active: lightScheme.errorActiveColor
    },
    arrowColor: {
      active: lightScheme.errorHoverColor
    }
  },
  warning: {
    crossColor: {
      hover: lightScheme.warningHoverColor,
      active: lightScheme.warningActiveColor
    },
    arrowColor: {
      active: lightScheme.warningHoverColor
    }
  }
}

const dark = {
  error: {
    crossColor: {
      hover: darkScheme.errorHoverColor,
      active: darkScheme.errorActiveColor
    },
    arrowColor: {
      active: darkScheme.errorHoverColor

    }
  },
  warning: {
    crossColor: {
      hover: darkScheme.warningHoverColor,
      active: darkScheme.warningActiveColor
    },
    arrowColor: {
      active: darkScheme.warningHoverColor
    }
  }
}

export default {
  fallback: light,
  dark
}
