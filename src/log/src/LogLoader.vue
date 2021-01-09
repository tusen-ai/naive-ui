<template>
  <div class="n-log-loader">
    <n-base-loading :stroke-width="24" /><span class="n-log-loader__content">
      {{ locale.loading }}
    </span>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { NBaseLoading } from '../../_base'
import { useLocale } from '../../_mixins'

export default defineComponent({
  components: {
    NBaseLoading
  },
  setup () {
    return {
      ...useLocale('Log')
    }
  }
})
</script>
