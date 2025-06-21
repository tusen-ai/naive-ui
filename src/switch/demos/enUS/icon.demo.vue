<markdown>
# Customizing Icon
</markdown>

<script lang="ts" setup>
import { ArrowBackOutline, ArrowForwardOutline } from '@vicons/ionicons5'
import { ref } from 'vue'

const active = ref(false)
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
