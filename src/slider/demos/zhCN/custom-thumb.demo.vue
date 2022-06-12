<markdown>
# 自定义标识

可以使用 `thumb` 插槽自定义滑块按钮。
</markdown>

<template>
  <n-space vertical>
    <n-slider v-model:value="value" :step="10">
      <template #thumb>
        <n-icon-wrapper :size="24" :border-radius="12">
          <n-icon :size="18" :component="AnimalCat24Regular" />
        </n-icon-wrapper>
      </template>
    </n-slider>
    <n-input-number v-model:value="value" size="small" />
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import AnimalCat24Regular from '@vicons/fluent/AnimalCat24Regular'

export default defineComponent({
  setup () {
    return {
      AnimalCat24Regular,
      value: ref(50)
    }
  }
})
</script>
