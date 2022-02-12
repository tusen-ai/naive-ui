<markdown>
# 自定义图标
</markdown>

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

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ArrowBackOutline, ArrowForwardOutline } from '@vicons/ionicons5'

export default defineComponent({
  setup () {
    return {
      active: ref(false),
      ArrowBackOutline,
      ArrowForwardOutline
    }
  }
})
</script>
