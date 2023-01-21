<markdown>
# Rtl Debug

</markdown>

<template>
  <n-space vertical>
    <n-space><n-switch v-model:value="rtlEnabled" />Rtl</n-space>
    <n-config-provider :rtl="rtlEnabled ? rtlStyles : undefined">
      <n-anchor :show-rail="showRail" :show-background="showBackground">
        <n-anchor-link title="演示" href="#演示">
          <n-anchor-link title="基础用法" href="#basic.vue" />
          <n-anchor-link title="忽略间隔" href="#ignore-gap.vue" />
          <n-anchor-link title="固定" href="#affix.vue" />
          <n-anchor-link title="滚动到" href="#scrollto.vue" />
        </n-anchor-link>
        <n-anchor-link title="API" href="#API" />
      </n-anchor>
    </n-config-provider>
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { unstableAnchorRtl } from 'naive-ui'

export default defineComponent({
  setup () {
    return {
      rtlEnabled: ref(false),
      rtlStyles: [unstableAnchorRtl],
      showRail: ref(true),
      showBackground: ref(true)
    }
  }
})
</script>
