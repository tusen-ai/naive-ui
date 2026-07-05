<markdown>
# Rtl Debug
</markdown>

<script lang="ts" setup>
import { unstableCollapseRtl } from 'naive-ui'
import { ref } from 'vue'

const rtlEnabled = ref(false)
const rtlStyles = [unstableCollapseRtl]
</script>

<template>
  <n-space vertical>
    <n-space><n-switch v-model:value="rtlEnabled" />Rtl</n-space>
    <n-config-provider :rtl="rtlEnabled ? rtlStyles : undefined">
      <n-collapse>
        <n-collapse-item title="青铜" name="1">
          <div>可以</div>
        </n-collapse-item>
        <n-collapse-item title="白银" name="2">
          <div>很好</div>
        </n-collapse-item>
        <n-collapse-item title="黄金" name="3">
          <div>真棒</div>
        </n-collapse-item>
      </n-collapse>
    </n-config-provider>
  </n-space>
</template>
