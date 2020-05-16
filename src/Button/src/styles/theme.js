const light = {
  default: {
    color: '#fff',
    hoverColor: '#fff',
    activeColor: '#fff',
    focusColor: '#fff',

    textColor: 'rgba(0, 0, 0, .72)',
    hoverTextColor: '#36ad6a',
    activeTextColor: '#0c7a43',
    focusTextColor: '#36ad6a',

    textTypedTextColor: 'rgba(0, 0, 0, .72)',
    textTypedHoverTextColor: '#36ad6a',
    textTypedActiveTextColor: '#0c7a43',
    textTypedFocusTextColor: '#36ad6a',

    ghostTypedTextColor: 'rgba(0, 0, 0, .72)',
    ghostTypedHoverTextColor: '#36ad6a',
    ghostTypedActiveTextColor: '#0c7a43',
    ghostTypedFocusTextColor: '#36ad6a',

    borderColor: '#d9d9d9',
    hoverBorderColor: '#36ad6a',
    activeBorderColor: '#0c7a43',
    focusBorderColor: '#36ad6a',

    rippleColor: '#18a058'
  },
  primary: {
    color: '#18a058',
    hoverColor: '#36ad6a',
    activeColor: '#0c7a43',
    focusColor: '#36ad6a',
    textColor: '#fff'
  },
  info: {
    color: '#2080f0',
    hoverColor: '#4098fc',
    activeColor: '#1060c9',
    focusColor: '#4098fc',
    textColor: '#fff'
  },
  success: {
    color: '#18a058',
    hoverColor: '#36ad6a',
    activeColor: '#0c7a43',
    focusColor: '#36ad6a',
    textColor: '#fff'
  },
  warning: {
    color: '#f0a020',
    hoverColor: '#fcb040',
    activeColor: '#c97c10',
    focusColor: '#fcb040',
    textColor: '#fff'
  },
  error: {
    color: '#d03050',
    hoverColor: '#de576d',
    activeColor: '#ab1f3f',
    focusColor: '#de576d',
    textColor: '#fff'
  }
}

const dark = {
  default: {
    color: 'transparent',
    hoverColor: 'transparent',
    activeColor: 'transparent',
    focusColor: 'transparent',

    textColor: 'rgba(255, 255, 255, .84)',
    hoverTextColor: '#7fe7c4',
    activeTextColor: '#5acea7',
    focusTextColor: '#7fe7c4',

    textTypedTextColor: 'rgba(255, 255, 255, .84)',
    textTypedHoverTextColor: '#7fe7c4',
    textTypedActiveTextColor: '#5acea7',
    textTypedFocusTextColor: '#7fe7c4',

    ghostTypedTextColor: 'rgba(255, 255, 255, .84)',
    ghostTypedHoverTextColor: '#7fe7c4',
    ghostTypedActiveTextColor: '#5acea7',
    ghostTypedFocusTextColor: '#7fe7c4',

    borderColor: 'rgba(255, 255, 255, .24)',
    hoverBorderColor: '#7fe7c4',
    activeBorderColor: '#5acea7',
    focusBorderColor: '#7fe7c4',

    rippleColor: '#63e2b7'
  },
  primary: {
    color: '#63e2b7',
    hoverColor: '#7fe7c4',
    activeColor: '#5acea7',
    focusColor: '#7fe7c4',
    textColor: '#000'
  },
  info: {
    color: '#70C0E8',
    hoverColor: '#8acbec',
    activeColor: '#66afd3',
    focusColor: '#8acbec',
    textColor: '#000'
  },
  success: {
    color: '#64e3b8',
    hoverColor: '#7ee7c4',
    activeColor: '#5acea7',
    focusColor: '#7ee7c4',
    textColor: '#000'
  },
  warning: {
    color: '#f2c97d',
    hoverColor: '#f5d599',
    activeColor: '#e6c260',
    focusColor: '#f5d599',
    textColor: '#000'
  },
  error: {
    color: '#e88080',
    hoverColor: '#e98b8b',
    activeColor: '#e57272',
    focusColor: '#e98b8b',
    textColor: '#000'
  }
}

export default {
  fallback: light,
  dark
}
