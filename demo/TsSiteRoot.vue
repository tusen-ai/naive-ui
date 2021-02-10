<template>
  <ts-config-provider>
    <site-root />
  </ts-config-provider>
</template>

<script>
import { TsConfigProvider } from '../themes/tusimple/src'
import SiteRoot from './SiteRoot.vue'

export default {
  components: {
    TsConfigProvider,
    SiteRoot
  }
}
</script>
