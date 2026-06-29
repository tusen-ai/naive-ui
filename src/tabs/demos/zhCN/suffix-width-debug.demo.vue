<markdown>
# Suffix Width Debug

`#7406`
</markdown>

<script setup lang="ts">
import { ref } from 'vue'

const currentTab = ref('oasis')
</script>

<template>
  <n-tabs v-model:value="currentTab">
    <template #prefix>
      Prefix
    </template>
    <n-tab-pane name="oasis" tab="Oasis">
      Wonderwall
    </n-tab-pane>
    <n-tab-pane name="theBeatles" tab="the Beatles">
      Hey Jude
    </n-tab-pane>
    <n-tab-pane name="jayChou" tab="周杰伦">
      七里香
    </n-tab-pane>
    <template #suffix>
      <div :style="{ width: currentTab === 'oasis' ? '100px' : 'auto' }">
        Suffix
      </div>
    </template>
  </n-tabs>
</template>
