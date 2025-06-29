<markdown>
# Fullscreen debug
</markdown>

<script lang="ts" setup>
function fullscreen() {
  document.getElementById('fs')?.requestFullscreen()
}
</script>

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
