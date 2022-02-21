<markdown>
# Closable

Set `closable` on `n-drawer-content`.
</markdown>

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

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      show: ref(false)
    }
  }
})
</script>
