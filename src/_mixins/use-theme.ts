/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { inject, computed, onBeforeMount, ComputedRef, PropType } from 'vue'
import { merge } from 'lodash-es'
import globalStyle from '../_styles/global/index.cssr'
import { CNode } from 'css-render'
import { ConfigProviderInjection, GlobalTheme } from '../config-provider'
import type { ThemeCommonVars } from '../_styles/new-common'

globalStyle.mount({
  id: 'naive-ui-global'
})

export interface Theme<T = {}, R = any> {
  name: string
  common?: ThemeCommonVars
  peers?: R
  self?: (vars: ThemeCommonVars) => T
}

export type ExtractThemeVars<T> = T extends Theme<infer U, unknown>
  ? unknown extends U // self is undefined, ThemeVars is unknown
    ? {}
    : U
  : {}

export type ExtractPeerOverrides<T> = T extends Theme<unknown, infer V>
  ? {
    peers?: {
      [k in keyof V]?: ExtractThemeVars<V[k]>
    }
  }
  : T

export type ExtractMergedPeerOverrides<T> = T extends Theme<unknown, infer V>
  ? {
    [k in keyof V]?: ExtractThemeVars<V[k]>
  }
  : T

export type ExtractThemeOverrides<T> = Partial<ExtractThemeVars<T>> &
ExtractPeerOverrides<T> & { common?: ThemeCommonVars }

export function createTheme<T, R> (theme: Theme<T, R>): Theme<T, R> {
  return theme
}

type UseThemeProps<T> = Readonly<{
  unstableTheme?: T | undefined
  unstableThemeOverrides?: ExtractThemeOverrides<T>
  builtinThemeOverrides?: ExtractThemeOverrides<T>
}>

export type MergedTheme<T> = T extends Theme<infer V, infer W>
  ? {
    common: ThemeCommonVars
    self: V
    peers: W
    overrides: ExtractMergedPeerOverrides<T>
  }
  : T

function useTheme<T, R> (
  resolveId: Exclude<keyof GlobalTheme, 'common'>,
  mountId: string,
  style: CNode | undefined,
  defaultTheme: Theme<T, R>,
  props: UseThemeProps<Theme<T, R>>
): ComputedRef<MergedTheme<Theme<T, R>>> {
  if (style) {
    onBeforeMount(() => {
      style.mount({
        target: mountId
      })
    })
  }
  const NConfigProvider = inject<ConfigProviderInjection | null>(
    'NConfigProvider',
    null
  )
  const mergedThemeRef = computed(() => {
    // keep props to make theme overrideable
    const {
      unstableTheme: { common, self, peers = {} } = {},
      unstableThemeOverrides: selfOverrides = {} as ExtractThemeOverrides<
      Theme<T, R>
      >,
      builtinThemeOverrides: builtinOverrides = {} as ExtractThemeOverrides<
      Theme<T, R>
      >
    } = props
    const { common: commonOverrides, peers: peersOverrides } = selfOverrides
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
      {},
      common || injectedCommon || injectedGlobalCommon || defaultTheme.common,
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
      self: mergedSelf as any,
      peers: merge({}, defaultTheme.peers, peers, injectedPeers),
      overrides: merge({}, peersOverrides, injectedPeersOverrides) as any
    }
  })
  return mergedThemeRef
}

useTheme.props = {
  unstableTheme: Object,
  unstableThemeOverrides: Object,
  builtinThemeOverrides: Object
} as const

export interface ThemeProps<T> {
  unstableTheme: PropType<T>
  unstableThemeOverrides: PropType<ExtractThemeOverrides<T>>
  builtinThemeOverrides: PropType<ExtractThemeOverrides<T>>
}

export interface ThemePropsReactive<T> {
  unstableTheme?: T
  unstableThemeOverrides?: ExtractThemeOverrides<T>
  builtinThemeOverrides?: ExtractThemeOverrides<T>
}

/**
 * props.unstableTheme (Theme):
 * {
 *   common: CommonThemeVars,
 *   self(): ThemeVars,
 *   peers: { Component: Theme }
 * }
 * provider.unstableTheme:
 * {
 *   common: CommonThemeVars,
 *   Button: Theme
 *   ...
 * }
 * defaultTheme:
 * {
 *   common: CommonThemeVars,
 *   self(): ThemeVars,
 *   peers: { Component: Theme }
 * }
 *
 * props.themeOverrides (ThemeOverrides):
 * {
 *   common: CommonThemeVars,
 *   peers: { Component: ThemeOverrides },
 *   ...ThemeVars
 * }
 * provider.themeOverrides:
 * {
 *   common: CommonThemeVars,
 *   Component: ThemeOverrides
 *   ...
 * }
 *
 * mergedTheme:
 * {
 *   common: CommonThemeVars,
 *   self: ThemeVars,
 *   peers: { Component: Theme },
 *   overrides: { Component: ThemeOverrides }
 * }
 */
export default useTheme
