<markdown>
# Customize icon
</markdown>

<script lang="ts" setup>
import { Reload } from '@vicons/ionicons5'
import { ref } from 'vue'

const show = ref(false)
</script>

<template>
  <n-spin :show="show">
    <template #icon>
      <n-icon>
        <Reload />
      </n-icon>
    </template>
  </n-spin>
</template>
