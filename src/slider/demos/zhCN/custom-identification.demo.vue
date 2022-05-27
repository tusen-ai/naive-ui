<markdown>
# 自定义标识

可以使用identity插槽自定义标识点。
</markdown>

<template>
  <n-space vertical>
    <n-slider v-model:value="value" :step="10">
      <template #identity>
        <n-icon-wrapper :size="24" :border-radius="10">
          <n-icon :size="18" :component="AirplaneTakeOff16Regular" />
        </n-icon-wrapper>
      </template>
    </n-slider>
    <n-input-number v-model:value="value" size="small" />
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import AirplaneTakeOff16Regular from '@vicons/fluent/AirplaneTakeOff16Regular'
export default defineComponent({
  setup () {
    return {
      AirplaneTakeOff16Regular,
      value: ref(50)
    }
  }
})
</script>
