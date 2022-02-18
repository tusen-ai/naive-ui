<markdown>
# 关闭时更新值
</markdown>

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

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      updateValueOnClose: ref(true)
    }
  }
})
</script>
