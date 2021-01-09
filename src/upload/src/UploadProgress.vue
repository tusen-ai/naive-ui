<template>
  <n-fade-in-expand-transition>
    <n-progress
      v-if="postponedShow"
      type="line"
      :show-indicator="false"
      :percentage="percentage"
      :status="status"
      :height="2"
      :unstable-theme="NUpload.mergedTheme.peers.Progress"
      :unstable-theme-overrides="NUpload.mergedTheme.overrides.Progress"
    />
  </n-fade-in-expand-transition>
</template>

<script>
import { defineComponent } from 'vue'
import { NFadeInExpandTransition } from '../../_base'
import { NProgress } from '../../progress'

export default defineComponent({
  name: 'UploadProgress',
  components: {
    NProgress,
    NFadeInExpandTransition
  },
  inject: ['NUpload'],
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
})
</script>
