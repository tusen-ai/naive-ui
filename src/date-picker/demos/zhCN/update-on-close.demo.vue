<markdown>
# 关闭时更新值
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const updateValueOnClose = ref(true)
</script>

<template>
  <n-space vertical>
    <n-date-picker
      type="datetime"
      :default-value="Date.now()"
      :update-value-on-close="updateValueOnClose"
    />
    <n-date-picker
      :default-value="[Date.now(), Date.now()]"
      :update-value-on-close="updateValueOnClose"
      type="daterange"
    />
    <n-date-picker
      :default-value="[Date.now(), Date.now()]"
      :update-value-on-close="updateValueOnClose"
      type="datetimerange"
    />
    <n-switch v-model:value="updateValueOnClose" />
  </n-space>
</template>
