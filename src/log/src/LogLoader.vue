<template>
  <div class="n-log-loader">
    <n-base-loading :stroke-width="24" :theme="theme" /><span
      class="n-log-loader__content"
    >
      {{ localeNs.loading }}
    </span>
  </div>
</template>

<script>
import { NBaseLoading } from '../../_base'
import { locale } from '../../_mixins'

export default {
  components: {
    NBaseLoading
  },
  mixins: [locale('Log')],
  props: {
    theme: {
      type: String,
      default: undefined
    }
  }
}
</script>
