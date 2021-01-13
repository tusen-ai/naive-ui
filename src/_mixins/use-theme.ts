import { inject, computed, onBeforeMount } from 'vue'
import { merge } from 'lodash-es'
import globalStyle from '../_styles/global/index.cssr.js'
import { CNode } from 'css-render'
import { ConfigProviderInjection, Theme, ThemeOverrides } from '../config-provider/index.js'

globalStyle.mount({
  id: 'naive-ui-global'
})

interface UseThemeProps {
  unstableTheme: Theme
  unstableThemeOverrides: ThemeOverrides
  builtinThemeOverrides: ThemeOverrides
}

function useTheme (resolveId: string, mountId: string, style: CNode | undefined, defaultTheme: Theme, props: UseThemeProps) {
  if (style) {
    onBeforeMount(() => {
      style.mount({
        target: mountId
      })
    })
  }
  const NConfigProvider = inject<ConfigProviderInjection | null>('NConfigProvider', null)
  const mergedThemeRef = computed(() => {
    // keep props to make theme overrideable
    const {
      unstableTheme: { common, self, peers = {} } = {},
      unstableThemeOverrides: selfOverrides = {},
      builtinThemeOverrides: builtinOverrides = {}
    } = props
    const {
      common: commonOverrides,
      peers: peersOverrides = {}
    } = selfOverrides
    const {
      mergedUnstableTheme: {
        common: injectedGlobalCommon = undefined,
        [resolveId]: {
          common: injectedCommon = undefined,
          self: injectedSelf = undefined,
          peers: injectedPeers = {}
        } = {}
      } = {},
      mergedUnstableThemeOverrides: {
        common: injectedGlobalCommonOverrides = undefined,
        [resolveId]: injectedSelfOverrides = {}
      } = {}
    } = NConfigProvider || {}
    const {
      common: injectedCommonOverrides,
      peers: injectedPeersOverrides = {}
    } = injectedSelfOverrides
    const mergedCommon = merge(
      common ||
        injectedCommon ||
        injectedGlobalCommon ||
        defaultTheme.common ||
        {},
      injectedGlobalCommonOverrides,
      injectedCommonOverrides,
      commonOverrides
    )
    const mergedSelf = merge(
      (self || injectedSelf || defaultTheme.self)?.(mergedCommon) || {},
      builtinOverrides,
      injectedSelfOverrides,
      selfOverrides
    )
    return {
      common: mergedCommon,
      self: mergedSelf,
      peers: merge(peers, injectedPeers),
      overrides: merge(peersOverrides, injectedPeersOverrides)
    }
  })
  return mergedThemeRef
}

useTheme.props = {
  unstableTheme: {
    type: Object,
    default: undefined
  },
  unstableThemeOverrides: {
    type: Object,
    default: undefined
  },
  builtinThemeOverrides: {
    type: Object,
    default: undefined
  }
}

/**
 * props.unstableTheme:
 * { common, self(), peers }
 * provider.unstableTheme:
 * { common, Button: { common, self(), peers } }
 * defaultTheme:
 * { common, self(), peers }
 *
 * props.themeOverrides:
 * { { common, self, peers } }
 * provider.themeOverrides:
 * { common, Button: { common, self, peers } }
 */
export default useTheme
