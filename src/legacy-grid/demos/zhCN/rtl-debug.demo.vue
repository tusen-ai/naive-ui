<markdown>
# Rtl Debug
</markdown>

<template>
  <n-space vertical>
    <n-space><n-switch v-model:value="rtlEnabled" />Rtl</n-space>
    <n-config-provider :rtl="rtlEnabled ? rtlStyles : undefined">
      <n-row gutter="12">
        <n-col :span="6">
          <div class="light-green" />
        </n-col>
        <n-col :span="6">
          <div class="green" />
        </n-col>
        <n-col :span="6">
          <div class="light-green" />
        </n-col>
        <n-col :span="6">
          <div class="green" />
        </n-col>
      </n-row>
    </n-config-provider>
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { unstableRowRtl } from 'naive-ui'

export default defineComponent({
  setup () {
    return {
      rtlEnabled: ref(false),
      rtlStyles: [unstableRowRtl]
    }
  }
})
</script>

<style>
.light-green {
  height: 108px;
  background-color: rgba(0, 128, 0, 0.12);
}
.green {
  height: 108px;
  background-color: rgba(0, 128, 0, 0.24);
}
</style>
