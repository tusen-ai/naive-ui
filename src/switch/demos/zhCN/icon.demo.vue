<markdown>
# 自定义图标
</markdown>

<template>
  <n-space>
    <n-switch v-model:value="active" size="medium">
      <template #icon>
        <n-icon :size="18" :component="NotificationsCircleOutline" />
      </template>
    </n-switch>
    <n-switch v-model:value="active" size="large">
      <template #checkedIcon>
        <n-icon :size="18" :component="MicCircleOutline" />
      </template>
      <template #uncheckedIcon>
        <n-icon :size="24" :component="MicOffCircleOutline" />
      </template>
    </n-switch>
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import {
  NotificationsCircleOutline,
  MicCircleOutline,
  MicOffCircleOutline
} from '@vicons/ionicons5'

export default defineComponent({
  setup () {
    return {
      active: ref(false),
      NotificationsCircleOutline,
      MicCircleOutline,
      MicOffCircleOutline
    }
  }
})
</script>
