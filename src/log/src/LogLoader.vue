<template>
  <div class="n-log-loader">
    <n-base-loading :stroke-width="24" :theme="theme" /><span
      class="n-log-loader__content"
    >
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
  props: {
    theme: {
      type: String,
      default: undefined
    }
  },
  setup () {
    return {
      ...useLocale('Log')
    }
  }
})
</script>
