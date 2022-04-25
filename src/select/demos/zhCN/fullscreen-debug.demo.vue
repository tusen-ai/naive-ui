<markdown>
# Fullscreen debug
</markdown>

<template>
  <div id="fs" style="overflow: scroll; max-height: 300px">
    <div style="height: 200vh">
      <n-select />
      <button @click="fullscreen">
        fullscreen
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {
      fullscreen: () => {
        document.getElementById('fs')?.requestFullscreen()
      }
    }
  }
})
</script>
