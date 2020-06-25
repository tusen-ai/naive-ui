const mountedStyleMap = new Map()

function isStyleMounted (id) {
  return mountedStyleMap.has(id)
}

function markStyleMounted (id) {
  return mountedStyleMap.set(id, 1)
}

function getThemeVariables (naive, themeName) {
  const themes = naive._themes
  const theme = themes[themeName]
  return theme.base
}

function createMountId (componentName, renderedTheme, dependencyKey, dependencyValue) {
  return componentName + '-' + renderedTheme + '-' + dependencyKey + (dependencyValue ? ('-' + dependencyValue) : '')
}

function prepareTheme (
  instance,
  theme,
  dependencyKey,
  CNode
) {
  const naive = instance.$naive
  const options = instance.$options
  const {
    fallbackTheme,
    _themes
  } = naive
  const renderedTheme = theme || fallbackTheme
  const dependencyValue = dependencyKey === 'syntheticTheme' ? renderedTheme : instance[dependencyKey]
  if (
    process.env.NODE_ENV !== 'production' &&
    (dependencyValue === null || dependencyValue === undefined)
  ) {
    console.error(`[naive-ui/mixins/usecssr]: ${options.name}.${dependencyKey} is ${dependencyValue}`)
  }
  const mountId = createMountId(
    options.name,
    renderedTheme,
    dependencyKey,
    dependencyValue
  )
  if (isStyleMounted(mountId)) return
  const cssrPropsGetter = _themes[renderedTheme][options.name]
  if (process.env.NODE_ENV !== 'production' && !cssrPropsGetter) {
    console.error(`[naive-ui/mixins/usecssr]: ${options.name}'s style not found`)
  }
  const themeVariables = getThemeVariables(naive, renderedTheme)
  const componentCssrProps = Object.assign(
    { $instance: instance },
    { $renderedTheme: renderedTheme, $fallbackTheme: fallbackTheme },
    cssrPropsGetter.cssrProps(themeVariables)
  )
  CNode.mount({
    target: mountId,
    props: componentCssrProps
  })
  markStyleMounted(mountId)
}

export default function (styles) {
  const watch = {}
  styles.forEach(style => {
    style.watch.forEach(watchKey => {
      watch[watchKey] = function () {
        prepareTheme(
          this,
          this.syntheticTheme || null,
          style.key,
          style.CNode,
          style.mountOnFalsyValue
        )
      }
    })
  })
  return {
    beforeMount () {
      styles.forEach(style => {
        prepareTheme(
          this,
          this.syntheticTheme || null,
          style.key,
          style.CNode,
          style.mountOnFalsyValue
        )
      })
    },
    watch
  }
}
