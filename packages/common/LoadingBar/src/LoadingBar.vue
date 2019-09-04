<template>
  <transition
    name="n-fade-in--transition"
    appear
    @after-enter="handleAfterEnter"
    @after-leave="handleAfterLeave"
  >
    <div
      v-show="!enter || (status !== 'finishing' && status !== 'error')"
      class="n-loading-bar-container"
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
export default {
  data () {
    return {
      progress: 0,
      status: null,
      finishCallback: null,
      enter: false
    }
  },
  methods: {
    handleAfterEnter () {
      this.enter = true
    },
    start () {
      if (this.status !== 'starting') {
        this.progress = 0
        this.status = 'starting'
        this.$refs.loadingBar.style.transition = 'max-width .15s linear, background-color .15s linear'
        window.setTimeout(() => {
          this.$refs.loadingBar.style.transition = null
          this.$refs.loadingBar.getBoundingClientRect()
          this.progress = 80
        }, 150)
      } else if (this.status === null) {
        this.progress = 0
        this.$nextTick().then(() => {
          this.$refs.loadingBar.getBoundingClientRect()
          this.progress = 80
        })
      }
    },
    finish (callback) {
      this.finishCallback = callback
      if (this.status === 'finishing') {
        // do nothing
      } else if (this.status === null) {
        this.status = 'finishing'
        this.progress = 100
      } else {
        this.progress = 100
        this.status = 'finishing'
      }
    },
    handleAfterLeave () {
      this.finishCallback()
    },
    error (callback) {
      this.finishCallback = callback
      if (this.status === 'error') {
        // do nothing
      } else if (this.status === null) {
        this.progress = 100
        this.status = 'error'
      } else {
        this.progress = 100
        this.status = 'error'
      }
    }
  }
}
</script>
