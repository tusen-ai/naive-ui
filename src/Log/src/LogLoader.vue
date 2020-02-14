<template>
  <div class="n-log-loader">
    <n-base-loading :stroke-width="24" /><span class="n-log-loader__content">Loading</span>
  </div>
</template>

<script>
import NBaseLoading from '../../_base/Loading'

export default {
  components: {
    NBaseLoading
  }
}
</script>
