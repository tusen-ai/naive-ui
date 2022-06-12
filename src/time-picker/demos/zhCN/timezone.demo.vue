<markdown>
# 时区
</markdown>

<template>
  <n-grid :cols="2" :x-gap="12" :y-gap="12">
    <n-grid-item>
      <n-form-item label="上海" :show-feedback="false">
        <n-time-picker
          v-model:value="value"
          style="width: 100%"
          time-zone="Asia/Shanghai"
        />
      </n-form-item>
    </n-grid-item>
    <n-grid-item>
      <n-form-item label="匹兹堡" :show-feedback="false">
        <n-time-picker
          v-model:value="value"
          style="width: 100%"
          time-zone="America/New_York"
        />
      </n-form-item>
    </n-grid-item>
    <n-grid-item>
      <n-form-item label="UTC" :show-feedback="false">
        <n-time-picker
          v-model:value="value"
          style="width: 100%"
          time-zone="UTC"
        />
      </n-form-item>
    </n-grid-item>
  </n-grid>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      value: ref(Date.now())
    }
  }
})
</script>
