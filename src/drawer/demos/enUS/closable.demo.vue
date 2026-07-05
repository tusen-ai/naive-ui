<markdown>
# Closable

Set `closable` on `n-drawer-content`.
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const show = ref(false)
</script>

<template>
  <n-button @click="show = true">
    Open
  </n-button>
  <n-drawer v-model:show="show" :width="502">
    <n-drawer-content title="Stoner" closable>
      Stoner is a 1965 novel by the American writer John Williams.
    </n-drawer-content>
  </n-drawer>
</template>
