<template>
  <transition
    name="n-fade-in-transition"
    appear
    @after-enter="handleAfterEnter"
    @after-leave="handleAfterLeave"
    @leave-cancelled="handleLeaveCancelled"
  >
    <div
      v-show="!enter || status === 'starting'"
      class="n-loading-bar-container"
      :class="{
        [`n-${syntheticTheme}-theme`]: syntheticTheme
      }"
    >
      <div
        ref="loadingBar"
        class="n-loading-bar"
        :class="{
          'n-loading-bar--starting': status === 'starting',
          'n-loading-bar--finishing': status === 'finishing',
          'n-loading-bar--error': status === 'error'
        }"
        :style="{
          maxWidth: progress + '%'
        }"
      />
    </div>
  </transition>
</template>

<script>
import usecssr from '../../_mixins/usecssr'
import styles from './styles'

export default {
  name: 'LoadingBar',
  mixins: [
    usecssr(styles)
  ],
  data () {
    return {
      progress: 0,
      status: null,
      finishCallback: null,
      enter: false,
      inheritedTheme: null,
      theme: null,
      activeAction: null
    }
  },
  computed: {
    syntheticTheme () {
      return this.theme || this.inheritedTheme
    }
  },
  methods: {
    handleAfterEnter () {
      this.enter = true
    },
    handleLeaveCancelled () {
      this.enter = false
    },
    start (fromProgress = 0, toProgress = 80) {
      if (this.status === null) {
        this.status = 'starting'
        this.activeAction = this.$nextTick().then(() => {
          this.$el.getBoundingClientRect()
          this.progress = toProgress
          return this.$nextTick()
        })
        return this.activeAction
      } else {
        this.progress = fromProgress
        this.activeAction = this.$nextTick().then(() => {
          this.$refs.loadingBar.style.transition = 'none'
          this.$refs.loadingBar.getBoundingClientRect()
          this.$refs.loadingBar.style.transition = null
          this.status = 'starting'
          this.progress = toProgress
          return this.$nextTick()
        })
        return this.activeAction
      }
    },
    finish (callback) {
      this.finishCallback = callback
      if (this.status === 'finishing') {
        this.activeAction = this.start(100, 100).then(() => {
          this.finish(callback)
        })
      } else if (this.status === null) {
        this.progress = 100
        this.activeAction = this.$nextTick().then(() => {
          this.$refs.loadingBar.style.transition = 'none'
          this.$refs.loadingBar.getBoundingClientRect()
          this.$refs.loadingBar.style.transition = null
          this.status = 'finishing'
        })
      } else {
        this.activeAction = this.activeAction.then(() => {
          this.progress = 100
          this.status = 'finishing'
        })
      }
    },
    error (callback) {
      this.finishCallback = callback
      if (this.status === 'error') {
        this.activeAction = this.start(100, 100).then(() => {
          this.error(callback)
        })
      } else if (this.status === null) {
        this.progress = 100
        this.activeAction = this.$nextTick().then(() => {
          this.$refs.loadingBar.style.transition = 'none'
          this.$refs.loadingBar.getBoundingClientRect()
          this.$refs.loadingBar.style.transition = null
          this.status = 'error'
        })
      } else {
        this.activeAction = this.activeAction.then(() => {
          this.progress = 100
          this.status = 'error'
        })
      }
    },
    handleAfterLeave () {
      this.enter = false
      this.status = null
      this.finishCallback()
    }
  }
}
</script>
