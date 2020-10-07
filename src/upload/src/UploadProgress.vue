<template>
  <n-fade-in-expand-transition>
    <n-progress
      v-if="postponedShow"
      type="line"
      :show-indicator="false"
      :percentage="percentage"
      :status="status"
      :height="2"
    />
  </n-fade-in-expand-transition>
</template>

<script>
import NFadeInExpandTransition from '../../_transition/FadeInExpandTransition'
import NProgress from '../../progress/index.js'

export default {
  name: 'UploadProgress',
  components: {
    NProgress,
    NFadeInExpandTransition
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    percentage: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      required: true
    },
    delay: {
      type: Number,
      default: 900
    }
  },
  data () {
    return {
      postponedShow: false
    }
  },
  watch: {
    show (value) {
      if (value) this.postponedShow = true
      else {
        window.setTimeout(() => {
          this.postponedShow = false
        }, this.delay)
      }
    }
  },
  created () {
    this.postponedShow = this.show
  }
}
</script>
