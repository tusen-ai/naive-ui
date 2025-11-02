<markdown>
# Rtl Debug
</markdown>

<script lang="ts" setup>
import { unstableRowRtl } from 'naive-ui'
import { ref } from 'vue'

const rtlEnabled = ref(false)
const rtlStyles = [unstableRowRtl]
</script>

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
