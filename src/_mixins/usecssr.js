const mountedStyleMap = new Map()

if (process.env.NODE_ENV !== 'production') {
  if (!window.naive) window.naive = {}
  window.naive.styleRenderingDuration = 0
}

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

function createMountId (
  componentName,
  renderedTheme,
  dependencyKey,
  dependencyValue
) {
  return (
    componentName + '-' +
    renderedTheme + '-' +
    dependencyKey + (dependencyValue ? ('-' + dependencyValue) : '')
  )
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
  // themeVariables: { base, derived }
  const themeVariables = getThemeVariables(naive, renderedTheme)
  const componentCssrProps = {
    $instance: instance,
    $base: themeVariables.base,
    $derived: themeVariables.derived,
    $local: cssrPropsGetter.cssrProps(themeVariables),
    $renderedTheme: renderedTheme,
    $fallbackTheme: fallbackTheme
  }
  CNode.mount({
    target: mountId,
    props: componentCssrProps
  })
  markStyleMounted(mountId)
}

export default function (styles) {
  // collect watchers
  const watchers = {}
  styles.forEach(style => {
    style.watch.forEach(watchKey => {
      if (!watchers[watchKey]) watchers[watchKey] = []
      watchers[watchKey].push(function (instance, syntheticTheme) {
        if (process.env.NODE_ENV !== 'production') {
          window.naive.styleRenderingDuration -= performance.now()
        }
        prepareTheme(
          instance,
          syntheticTheme || null,
          style.key,
          style.CNode
        )
        if (process.env.NODE_ENV !== 'production') {
          window.naive.styleRenderingDuration += performance.now()
        }
      })
    })
  })
  // create component watch options
  const watch = {}
  Object
    .keys(watchers)
    .forEach(
      watchKey => {
        watch[watchKey] = function () {
          const syntheticTheme = this.syntheticTheme
          watchers[watchKey].forEach(watcher => {
            watcher(this, syntheticTheme)
          })
        }
      }
    )
  return {
    beforeMount () {
      styles.forEach(style => {
        if (process.env.NODE_ENV !== 'production') {
          window.naive.styleRenderingDuration -= performance.now()
        }
        prepareTheme(
          this,
          this.syntheticTheme || null,
          style.key,
          style.CNode
        )
        if (process.env.NODE_ENV !== 'production') {
          window.naive.styleRenderingDuration += performance.now()
        }
      })
    },
    watch
  }
}
