import {
  h,
  Transition,
  computed,
  defineComponent,
  inject,
  withDirectives,
  vShow,
  VNode,
  CSSProperties,
  ref,
  nextTick
} from 'vue'
import { ThemePropsReactive, useTheme } from '../../_mixins'
import { loadingBarLight } from '../styles'
import type { LoadingBarTheme } from '../styles'
import style from './styles/index.cssr'

function createClassName (status: 'error' | 'finishing' | 'starting'): string {
  return `n-loading-bar n-loading-bar--${status}`
}

export default defineComponent({
  name: 'LoadingBar',
  setup () {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const loadingBarProps = inject<ThemePropsReactive<LoadingBarTheme>>(
      'NLoadingBarProps'
    )!
    const loadingBarRef = ref<HTMLElement | null>(null)
    const enteringRef = ref(false)
    const loadingRef = ref(false)
    let finishing = false
    let erroring = false
    function init (): void {
      enteringRef.value = false
      loadingRef.value = false
      finishing = false
      erroring = false
    }
    async function start (
      fromProgress = 0,
      toProgress = 80,
      status: 'starting' | 'error' = 'starting'
    ): Promise<void> {
      init()
      await nextTick()
      loadingRef.value = true
      await nextTick()
      const el = loadingBarRef.value
      if (!el) return
      el.style.maxWidth = `${fromProgress}%`
      el.style.transition = 'none'
      void el.offsetWidth
      el.className = createClassName(status)
      el.style.transition = ''
      el.style.maxWidth = `${toProgress}%`
    }
    function finish (): void {
      if (finishing || erroring) return
      if (!loadingRef.value) {
        void start(100, 100).then(() => {
          finishing = true
          const el = loadingBarRef.value
          if (!el) return
          el.className = createClassName('finishing')
          void el.offsetWidth
          loadingRef.value = false
        })
      } else {
        finishing = true
        const el = loadingBarRef.value
        if (!el) return
        el.className = createClassName('finishing')
        el.style.maxWidth = '100%'
        void el.offsetWidth
        loadingRef.value = false
      }
    }
    function error (): void {
      if (finishing || erroring) return
      if (!loadingRef.value) {
        void start(100, 100, 'error').then(() => {
          erroring = true
          const el = loadingBarRef.value
          if (!el) return
          el.className = createClassName('error')
          void el.offsetWidth
          loadingRef.value = false
        })
      } else {
        erroring = true
        const el = loadingBarRef.value
        if (!el) return
        el.className = createClassName('error')
        el.style.maxWidth = '100%'
        void el.offsetWidth
        loadingRef.value = false
      }
    }
    function handleEnter (): void {
      enteringRef.value = true
    }
    function handleAfterEnter (): void {
      enteringRef.value = false
    }
    function handleAfterLeave (): void {
      init()
    }
    const themeRef = useTheme(
      'LoadingBar',
      'LoadingBar',
      style,
      loadingBarLight,
      loadingBarProps
    )
    return {
      loadingBarRef,
      loading: loadingRef,
      entering: enteringRef,
      start,
      error,
      finish,
      handleEnter,
      handleAfterEnter,
      handleAfterLeave,
      cssVars: computed(() => {
        const {
          self: { height, colorError, colorLoading }
        } = themeRef.value
        return {
          '--height': height,
          '--color-loading': colorLoading,
          '--color-error': colorError
        }
      })
    }
  },
  render () {
    return (
      <Transition
        name="n-fade-in-transition"
        appear
        onEnter={this.handleEnter}
        onAfterEnter={this.handleAfterEnter}
        onAfterLeave={this.handleAfterLeave}
      >
        {/*
          BUG: need to use v-show nor it will glitch when triggers start, end,
          start. This could be a bug of vue but currently I have no time to verify
          it.
        */}
        {{
          default: () =>
            withDirectives(
              h(
                'div',
                {
                  class: 'n-loading-bar-container'
                },
                [
                  (
                    <div
                      ref="loadingBarRef"
                      class="n-loading-bar"
                      style={this.cssVars as CSSProperties}
                    />
                  ) as VNode
                ]
              ),
              [[vShow, this.loading || (!this.loading && this.entering)]]
            )
        }}
      </Transition>
    )
  }
})
