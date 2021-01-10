<template>
  <transition
    name="n-fade-in-transition"
    appear
    @enter="handleEnter"
    @after-enter="handleAfterEnter"
    @after-leave="handleAfterLeave"
  >
    <!--
      BUG: need to use v-show nor it will glitch when triggers start, end,
      start. This could be a bug of vue but currently I have no time to verify
      it.
    -->
    <div
      v-show="loading || (!loading && entering)"
      class="n-loading-bar-container"
    >
      <div ref="loadingBar" class="n-loading-bar" :style="cssVars" />
    </div>
  </transition>
</template>

<script>
import { computed, defineComponent, inject } from 'vue'
import { useTheme } from '../../_mixins'
import { loadingBarLight } from '../styles'
import style from './styles/index.cssr.js'

function createClassName (status) {
  return `n-loading-bar n-loading-bar--${status}`
}

export default defineComponent({
  name: 'LoadingBar',
  setup () {
    const loadingBarProps = inject('NLoadingBarProps')
    const themeRef = useTheme(
      'LoadingBar',
      'LoadingBar',
      style,
      loadingBarLight,
      loadingBarProps
    )
    return {
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
  data () {
    return {
      entering: false,
      loading: false,
      finishing: false,
      erroring: false
    }
  },
  methods: {
    init () {
      this.entered = false
      this.loading = false
      this.finishing = false
      this.erroring = false
    },
    start (fromProgress = 0, toProgress = 80, status = 'starting') {
      this.init()
      return this.$nextTick(() => {
        this.loading = true
        return this.$nextTick()
      }).then(() => {
        const el = this.$refs.loadingBar
        el.style.maxWidth = `${fromProgress}%`
        el.style.transition = 'none'
        void el.offsetWidth
        el.className = createClassName(status)
        el.style.transition = null
        el.style.maxWidth = `${toProgress}%`
      })
    },
    finish () {
      if (this.finishing || this.erroring) return
      if (!this.loading) {
        this.start(100, 100).then(() => {
          this.finishing = true
          const el = this.$refs.loadingBar
          el.className = createClassName('finishing')
          void el.offsetWidth
          this.loading = false
        })
      } else {
        this.finishing = true
        const el = this.$refs.loadingBar
        el.className = createClassName('finishing')
        el.style.maxWidth = '100%'
        void el.offsetWidth
        this.loading = false
      }
    },
    error () {
      if (this.finishing || this.erroring) return
      if (!this.loading) {
        this.start(100, 100, 'error').then(() => {
          this.erroring = true
          const el = this.$refs.loadingBar
          el.className = createClassName('error')
          void el.offsetWidth
          this.loading = false
        })
      } else {
        this.erroring = true
        const el = this.$refs.loadingBar
        el.className = createClassName('error')
        el.style.maxWidth = '100%'
        void el.offsetWidth
        this.loading = false
      }
    },
    handleEnter () {
      this.entering = true
    },
    handleAfterEnter () {
      this.entering = false
    },
    handleAfterLeave () {
      this.init()
    }
  }
})
</script>
