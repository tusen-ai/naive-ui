import { find } from '../_utils/cssr'
import { warn } from '../_utils'
import { fallbackTheme } from './themeable'

if (__DEV__) {
  if (!window.naive) window.naive = {}
  window.naive.styleRenderingDuration = 0
}

function getRenderedTheme (vm) {
  return vm.mergedTheme || vm.theme || fallbackTheme
}

function getGlobalVars (styles, theme) {
  const {
    [theme]: { base }
  } = styles
  return base.getGlobalVars() // style[theme].base, for example style.light.base
}

function getLocalStyle (styles, theme, resolveId) {
  return styles[theme][resolveId]
}

function getLocalVars (localStyle, globalVars) {
  return localStyle.getLocalVars(globalVars)
}

function createMutableStyleId (
  componentCssrId,
  renderedTheme,
  depKey,
  depValue
) {
  if (depKey === 'mergedTheme' || depKey === 'theme') {
    return componentCssrId + '-' + renderedTheme
  }
  return (
    componentCssrId +
    '-' +
    renderedTheme +
    '-' +
    depKey +
    (depValue ? '-' + depValue : '')
  )
}

function setupMutableStyle (vm, theme, depKey, CNode) {
  const {
    $naive: { styles },
    $options: options
  } = vm
  const resolveId = options.cssrName || options.name
  const mountPrefix = options.cssrId || options.name
  const depValue =
    depKey === 'mergedTheme' || depKey === 'theme' ? theme : vm[depKey]
  if (depValue === null || depValue === undefined) {
    if (__DEV__) {
      warn(
        'mixins/with-cssr',
        `dependency key ${resolveId}.${depKey} should not be nullable`
      )
    }
    return
  }
  // create mount id
  const mountId = createMutableStyleId(mountPrefix, theme, depKey, depValue)
  if (find(mountId)) return
  // get global style
  const globalVars = getGlobalVars(styles, theme)
  // get component sytle
  const localStyle = getLocalStyle(styles, theme, resolveId)
  const localVars = getLocalVars(localStyle, globalVars)
  // get cssr props
  const cssrProps = createCssrProps(vm, theme, globalVars, localVars)
  // mount the style
  CNode.mount({
    target: mountId,
    props: cssrProps,
    count: false
  })
}

function createCssrProps (vm, theme, globalVars, localVars) {
  return {
    $vm: vm,
    $theme: theme,
    $global: globalVars,
    $local: localVars
  }
}

function getCssrProps (vm, theme) {
  const {
    $naive: { styles },
    $options: options
  } = vm
  const resolveId = options.cssrName || options.name
  const globalVars = getGlobalVars(styles, theme)
  const localStyle = getLocalStyle(styles, theme, resolveId)
  const localVars = getLocalVars(localStyle, globalVars)
  return createCssrProps(vm, theme, globalVars, localVars)
}

const withCssr = function (styles = [], options = {}) {
  let data
  // collect watchers
  const watchers = {}
  const { themeKey, injectCssrProps } = options
  if (themeKey && injectCssrProps) {
    watchers[themeKey] = [
      (vm) => {
        vm.cssrProps = getCssrProps(vm, vm[themeKey])
      }
    ]
    data = function () {
      return {
        cssrProps: getCssrProps(this, this[themeKey])
      }
    }
  }
  styles.forEach((style) => {
    if (__DEV__ && !style.watch) {
      warn('with-cssr', 'Style option has no `watch` field.')
      return
    }
    style.watch.forEach((watchKey) => {
      if (!watchers[watchKey]) watchers[watchKey] = []
      watchers[watchKey].push(function (vm, mergedTheme) {
        if (__DEV__) {
          window.naive.styleRenderingDuration -= performance.now()
        }
        setupMutableStyle(vm, mergedTheme, style.key, style.CNode)
        if (__DEV__) {
          window.naive.styleRenderingDuration += performance.now()
        }
      })
    })
  })
  // create component watch options
  const watchOptions = {}
  Object.keys(watchers).forEach((watchKey) => {
    watchOptions[watchKey] = function () {
      watchers[watchKey].forEach((watcher) => {
        watcher(this, getRenderedTheme(this))
      })
    }
  })
  return {
    data,
    beforeMount () {
      styles.forEach((style) => {
        if (__DEV__) {
          window.naive.styleRenderingDuration -= performance.now()
        }
        if (style.key) {
          setupMutableStyle(
            this,
            getRenderedTheme(this),
            style.key,
            style.CNode
          )
        } else if (__DEV__) {
          warn('mixins/with-cssr', 'style has no dependency key')
        }
        if (__DEV__) {
          window.naive.styleRenderingDuration += performance.now()
        }
      })
    },
    watch: watchOptions
  }
}

export default withCssr
