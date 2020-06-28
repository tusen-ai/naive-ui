<template>
  <n-fade-in-height-expand-transition>
    <n-progress
      v-if="postponedShow"
      type="line"
      :show-indicator="false"
      :percentage="percentage"
      :status="status"
      :height="2"
    />
  </n-fade-in-height-expand-transition>
</template>

<script>
import NFadeInHeightExpandTransition from '../../_transition/FadeInHeightExpandTransition'
import NProgress from '../../progress/index.js'

export default {
  name: 'NUploadProgress',
  components: {
    NProgress,
    NFadeInHeightExpandTransition
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
