<markdown>
# 自定义图标
</markdown>

<script lang="ts">
import { ArrowBackOutline, ArrowForwardOutline } from '@vicons/ionicons5'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    return {
      active: ref(false),
      ArrowBackOutline,
      ArrowForwardOutline
    }
  }
})
</script>

<template>
  <n-space>
    <n-switch v-model:value="active" size="medium">
      <template #icon>
        🤔
      </template>
    </n-switch>
    <n-switch v-model:value="active" size="large">
      <template #checked-icon>
        <n-icon :component="ArrowForwardOutline" />
      </template>
      <template #unchecked-icon>
        <n-icon :component="ArrowBackOutline" />
      </template>
    </n-switch>
  </n-space>
</template>
