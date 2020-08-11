<template>
  <div class="n-log-loader">
    <n-base-loading :stroke-width="24" :theme="theme" /><span class="n-log-loader__content">Loading</span>
  </div>
</template>

<script>
import NBaseLoading from '../../_base/loading'

export default {
  components: {
    NBaseLoading
  },
  props: {
    theme: {
      type: String,
      default: null
    }
  }
}
</script>
