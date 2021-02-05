import {
  Fragment,
  h,
  ref,
  Teleport,
  defineComponent,
  provide,
  nextTick,
  PropType
} from 'vue'
import { useIsMounted } from 'vooks'
import { ThemePropsReactive, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import NLoadingBar from './LoadingBar'
import type { LoadingBarTheme } from '../styles'
import { LoadingBarApiInjection } from './interface'

interface LoadingBarRef {
  start: () => void
  error: () => void
  finish: () => void
}

export default defineComponent({
  name: 'LoadingBarProvider',
  props: {
    ...(useTheme.props as ThemeProps<LoadingBarTheme>),
    to: {
      type: [String, Object] as PropType<string | HTMLElement>,
      default: undefined
    }
  },
  setup (props, { slots }) {
    const isMountedRef = useIsMounted()
    const loadingBarRef = ref<LoadingBarRef | null>(null)
    const methods = {
      start () {
        if (isMountedRef.value) {
          loadingBarRef.value?.start()
        } else {
          void nextTick(() => {
            loadingBarRef.value?.start()
          })
        }
      },
      error () {
        if (isMountedRef.value) {
          loadingBarRef.value?.error()
        } else {
          void nextTick(() => {
            loadingBarRef.value?.error()
          })
        }
      },
      finish () {
        if (isMountedRef.value) {
          loadingBarRef.value?.finish()
        } else {
          void nextTick(() => {
            loadingBarRef.value?.finish()
          })
        }
      }
    }
    provide<LoadingBarApiInjection>('loadingBar', methods)
    provide<ThemePropsReactive<LoadingBarTheme>>('NLoadingBarProps', props)
    return () => {
      return h(Fragment, null, [
        h(
          Teleport,
          {
            to: props.to ?? 'body'
          },
          [
            h(NLoadingBar, {
              ref: loadingBarRef
            })
          ]
        ),
        slots.default?.()
      ])
    }
  }
})
