import { inject, computed, onBeforeMount } from 'vue'
import { merge } from 'lodash-es'

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
export default function useTheme (
  resolveId,
  mountId,
  style,
  defaultTheme,
  props
) {
  onBeforeMount(() => {
    style.mount({
      target: mountId
    })
  })
  const NConfigProvider = inject('NConfigProvider', {})
  const mergedThemeRef = computed(() => {
    const {
      unstableTheme: { common, self, peers = {} } = {},
      unstableThemeOverrides: {
        common: commonOverrides,
        self: selfOverrides,
        peers: peersOverrides = {}
      } = {}
    } = props
    const {
      mergedUnstableTheme: {
        common: injectedGlobalCommon,
        [resolveId]: {
          common: injectedCommon,
          self: injectedSelf,
          peers: injectedPeers = {}
        } = {}
      } = {},
      mergedUnstableThemeOverrides: {
        common: injectedGlobalCommonOverrides,
        [resolveId]: {
          common: injectedCommonOverrides,
          self: injectedSelfOverrides,
          peers: injectedPeersOverrides = {}
        } = {}
      } = {}
    } = NConfigProvider
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
      injectedSelfOverrides,
      selfOverrides
    )
    return {
      common: mergedCommon,
      self: mergedSelf,
      peersTheme: merge(peers, injectedPeers),
      peersOverride: merge(peersOverrides, injectedPeersOverrides)
    }
  })
  return mergedThemeRef
}
