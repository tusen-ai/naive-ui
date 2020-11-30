import { find } from '../_utils/cssr'
import { warn } from '../_utils'

if (__DEV__) {
  if (!window.naive) window.naive = {}
  window.naive.styleRenderingDuration = 0
}

function getThemeGlobalVars (naive, themeName) {
  const { styles } = naive
  const theme = styles[themeName]
  return theme.base.vars // style[theme]base, for example style.light.base
}

function createMutableStyleId (
  componentCssrId,
  renderedTheme,
  depKey,
  depValue
) {
  if (
    depKey === 'mergedTheme' ||
    depKey === 'theme'
  ) {
    return componentCssrId + '-' + renderedTheme
  }
  return (
    componentCssrId + '-' +
    renderedTheme + '-' +
    depKey + (depValue ? ('-' + depValue) : '')
  )
}

function createImmutableStyleId (
  componentName
) {
  return componentName
}

function setupMutableStyle (
  instance,
  theme,
  depKey,
  CNode
) {
  const {
    $naive: naive,
    $options: options
  } = instance
  const {
    styles
  } = naive
  const name = options.cssrName || options.name
  const id = options.cssrId || name
  const depValue = (
    depKey === 'mergedTheme' ||
    depKey === 'theme'
  ) ? theme : instance[depKey]
  if (
    __DEV__ &&
    (depValue === null || depValue === undefined)
  ) {
    warn('mixins/with-cssr', `dependency key ${name}.${depKey} should not be nullable`)
  }
  const mountId = createMutableStyleId(
    id,
    theme,
    depKey,
    depValue
  )
  if (find(mountId)) return
  const compStyle = styles[theme][name]
  if (__DEV__ && !compStyle) {
    warn('mixins/with-cssr', `${name}'s style not found`)
  }
  // themeVariables: { base, derived }
  const themeGlobalVars = getThemeGlobalVars(naive, theme)
  const componentCssrProps = {
    $instance: instance,
    $global: themeGlobalVars,
    $local: compStyle.cssrProps(themeGlobalVars),
    $theme: theme
  }
  CNode.mount({
    target: mountId,
    props: componentCssrProps,
    count: false
  })
}

function setupImmutableStyle (
  instance,
  CNode
) {
  const options = instance.$options
  const mountId = createImmutableStyleId(
    options.cssrId || options.cssrName || options.name
  )
  if (find(mountId)) return
  CNode.mount({
    target: mountId,
    props: {
      $instance: instance
    },
    count: false
  })
}

function getCssrProps (
  instance,
  theme
) {
  const naive = instance.$naive
  const options = instance.$options
  const {
    styles
  } = naive
  const name = options.cssrName || options.name
  const cssrPropsGetter = styles[theme][name]
  const themeVariables = getThemeGlobalVars(naive, theme)
  return {
    $instance: instance,
    $base: themeVariables.base,
    $derived: themeVariables.derived,
    $local: cssrPropsGetter.cssrProps(themeVariables),
    $theme: theme
  }
}

const withCssr = function (styles = [], cssrPropsOption) {
  // collect watchers
  const watchers = {}
  if (
    cssrPropsOption &&
    cssrPropsOption.themeKey &&
    cssrPropsOption.injectCssrProps
  ) {
    const themeKey = cssrPropsOption.themeKey
    watchers[themeKey] = [
      instance => {
        instance.cssrProps = getCssrProps(instance, instance[themeKey])
      }
    ]
  }
  styles.forEach(style => {
    if (!style.watch) return
    style.watch.forEach(watchKey => {
      if (!watchers[watchKey]) watchers[watchKey] = []
      watchers[watchKey].push(
        function (instance, mergedTheme) {
          if (__DEV__) {
            window.naive.styleRenderingDuration -= performance.now()
          }
          setupMutableStyle(
            instance,
            mergedTheme,
            style.key,
            style.CNode
          )
          if (__DEV__) {
            window.naive.styleRenderingDuration += performance.now()
          }
        }
      )
    })
  })
  // create component watch options
  const watch = {}
  Object
    .keys(watchers)
    .forEach(
      watchKey => {
        watch[watchKey] = function () {
          // TODO use `themeKey`
          const mergedTheme = this.mergedTheme || this.theme
          watchers[watchKey].forEach(watcher => {
            watcher(this, mergedTheme)
          })
        }
      }
    )
  return {
    data: (
      cssrPropsOption &&
      cssrPropsOption.themeKey &&
      cssrPropsOption.injectCssrProps
    ) ? function () {
        return {
          cssrProps: getCssrProps(this, this[cssrPropsOption.themeKey])
        }
      } : undefined,
    beforeMount () {
      styles.forEach(style => {
        if (__DEV__) {
          window.naive.styleRenderingDuration -= performance.now()
        }
        if (style.key) {
          setupMutableStyle(
            this,
            // TODO use `themeKey`
            this.mergedTheme || this.theme,
            style.key,
            style.CNode
          )
        } else {
          setupImmutableStyle(
            this,
            style.CNode
          )
        }
        if (__DEV__) {
          window.naive.styleRenderingDuration += performance.now()
        }
      })
    },
    watch
  }
}

export default withCssr
