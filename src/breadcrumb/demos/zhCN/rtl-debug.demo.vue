<markdown>
# Rtl Debug

</markdown>

<template>
  <n-space vertical>
    <n-space><n-switch v-model:value="rtlEnabled" />Rtl</n-space>
    <n-config-provider :rtl="rtlEnabled ? rtlStyles : undefined">
      <n-breadcrumb>
        <n-breadcrumb-item>
          <n-icon :component="MdCash" /> 北京总行</n-breadcrumb-item>
        <n-breadcrumb-item>
          <n-icon :component="MdCash" /> 天津分行</n-breadcrumb-item>
        <n-breadcrumb-item>
          <n-icon :component="MdCash" /> 平山道支行</n-breadcrumb-item>
      </n-breadcrumb>
    </n-config-provider>
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { unstableBreadcrumbRtl } from 'naive-ui'
import { MdCash } from '@vicons/ionicons4'

export default defineComponent({
  setup () {
    return {
      rtlEnabled: ref(false),
      rtlStyles: [unstableBreadcrumbRtl],
      MdCash
    }
  }
})
</script>
