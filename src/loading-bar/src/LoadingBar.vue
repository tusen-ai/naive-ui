<template>
  <transition
    name="n-fade-in-transition"
    appear
    @enter="handleEnter"
    @after-enter="handleAfterEnter"
    @after-leave="handleAfterLeave"
  >
    <div
      v-if="loading || (!loading && entering)"
      class="n-loading-bar-container"
      :class="{
        [`n-${mergedTheme}-theme`]: mergedTheme
      }"
    >
      <div
        ref="loadingBar"
        class="n-loading-bar"
      />
    </div>
  </transition>
</template>

<script>
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import usecssr from '../../_mixins/usecssr'
import styles from './styles'

function createClassName (status) {
  return `n-loading-bar n-loading-bar--${status}`
}

export default {
  name: 'LoadingBar',
  mixins: [
    withapp,
    themeable,
    usecssr(styles)
  ],
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
      this.finishing = true
      if (!this.loading) {
        this.start(100, 100).then(() => {
          const el = this.$refs.loadingBar
          el.className = createClassName('finishing')
          void el.offsetWidth
          this.loading = false
        })
      } else {
        const el = this.$refs.loadingBar
        el.className = createClassName('finishing')
        el.style.maxWidth = '100%'
        void el.offsetWidth
        this.loading = false
      }
    },
    error () {
      if (this.finishing || this.erroring) return
      this.erroring = true
      if (!this.loading) {
        this.start(100, 100, 'error').then(() => {
          const el = this.$refs.loadingBar
          el.className = createClassName('error')
          void el.offsetWidth
          this.loading = false
        })
      } else {
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
}
</script>
