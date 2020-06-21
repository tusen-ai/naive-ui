const styleMountStatus = {}

function isStyleMounted (componentName, renderedTheme) {
  const componentStyleMountStatus = styleMountStatus[componentName]
  if (!componentStyleMountStatus) return false
  if (!componentStyleMountStatus[renderedTheme]) return false
  return true
}

function markStyleMounted (componentName, renderedTheme) {
  if (!styleMountStatus[componentName]) {
    styleMountStatus[componentName] = {
      [renderedTheme]: true
    }
  } else if (!styleMountStatus[componentName][renderedTheme]) {
    styleMountStatus[componentName][renderedTheme] = true
  }
}

function getThemeVariables (naive, themeName) {
  const themes = naive._themes
  const theme = themes[themeName]
  return theme.base
}

function prepareTheme (instance, theme, CNode) {
  const naive = instance.$naive
  const options = instance.$options
  const {
    fallbackTheme,
    _themes
  } = naive
  const renderedTheme = theme || fallbackTheme
  if (isStyleMounted(options.name, renderedTheme)) return
  const cssrPropsGetter = _themes[renderedTheme][options.name]
  if (process.env.NODE_ENV !== 'production' && !cssrPropsGetter) {
    console.error(`[naive-ui/mixins/usecssr]: ${options.name}'s style not found`)
  }
  const themeVariables = getThemeVariables(naive, renderedTheme)
  const componentCssrProps = Object.assign(
    {},
    cssrPropsGetter.cssrProps(themeVariables),
    { theme: renderedTheme, fallbackTheme }
  )
  CNode.mount({
    target: options.name,
    props: componentCssrProps
  })
  markStyleMounted(options.name, renderedTheme)
}

export default function (CNode) {
  return {
    beforeMount () {
      prepareTheme(this, this.syntheticTheme || null, CNode)
    },
    watch: {
      syntheticTheme (value) {
        prepareTheme(this, value, CNode)
      }
    }
  }
}
