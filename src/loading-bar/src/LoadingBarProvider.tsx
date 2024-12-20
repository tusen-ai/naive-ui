import type { ThemeProps } from '../../_mixins'
import type { ExtractPublicPropTypes } from '../../_utils'
import type { LoadingBarTheme } from '../styles'
import { useIsMounted } from 'vooks'
import {
  type CSSProperties,
  defineComponent,
  type ExtractPropTypes,
  Fragment,
  h,
  nextTick,
  type PropType,
  provide,
  ref,
  Teleport
} from 'vue'
import { useConfig, useTheme } from '../../_mixins'
import {
  loadingBarApiInjectionKey,
  loadingBarProviderInjectionKey
} from './context'
import NLoadingBar from './LoadingBar'

export interface LoadingBarInst {
  start: () => void
  error: () => void
  finish: () => void
}

export type LoadingBarProviderInst = LoadingBarInst
export type LoadingBarApiInjection = LoadingBarInst

export const loadingBarProviderProps = {
  ...(useTheme.props as ThemeProps<LoadingBarTheme>),
  to: {
    type: [String, Object, Boolean] as PropType<string | HTMLElement | false>,
    default: undefined
  },
  containerClass: String,
  containerStyle: [String, Object] as PropType<string | CSSProperties>,
  loadingBarStyle: {
    type: Object as PropType<{
      loading?: string | CSSProperties
      error?: string | CSSProperties
    }>
  }
}

export type LoadingBarProviderProps = ExtractPublicPropTypes<
  typeof loadingBarProviderProps
>

export type LoadingBarProviderSetupProps = ExtractPropTypes<
  typeof loadingBarProviderProps
>

export default defineComponent({
  name: 'LoadingBarProvider',
  props: loadingBarProviderProps,
  setup(props) {
    const isMountedRef = useIsMounted()
    const loadingBarRef = ref<LoadingBarInst | null>(null)
    const methods: LoadingBarProviderInst = {
      start() {
        if (isMountedRef.value) {
          loadingBarRef.value?.start()
        }
        else {
          void nextTick(() => {
            loadingBarRef.value?.start()
          })
        }
      },
      error() {
        if (isMountedRef.value) {
          loadingBarRef.value?.error()
        }
        else {
          void nextTick(() => {
            loadingBarRef.value?.error()
          })
        }
      },
      finish() {
        if (isMountedRef.value) {
          loadingBarRef.value?.finish()
        }
        else {
          void nextTick(() => {
            loadingBarRef.value?.finish()
          })
        }
      }
    }
    const { mergedClsPrefixRef } = useConfig(props)
    provide(loadingBarApiInjectionKey, methods)
    provide(loadingBarProviderInjectionKey, {
      props,
      mergedClsPrefixRef
    })
    return Object.assign(methods, {
      loadingBarRef
    })
  },
  render() {
    return (
      <>
        <Teleport disabled={this.to === false} to={this.to || 'body'}>
          <NLoadingBar
            ref="loadingBarRef"
            containerStyle={this.containerStyle}
            containerClass={this.containerClass}
          />
        </Teleport>
        {this.$slots.default?.()}
      </>
    )
  }
})
