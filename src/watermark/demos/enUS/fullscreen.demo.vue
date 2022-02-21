<markdown>
# Fullscreen

You can make it displayed in fullscreen mode.
</markdown>

<template>
  <n-watermark
    v-if="show"
    content="All the roads we have to walk are winding"
    cross
    fullscreen
    :font-size="16"
    :line-height="16"
    :width="384"
    :height="384"
    :x-offset="12"
    :y-offset="80"
    :rotate="-15"
  />
  <n-switch v-model:value="show" />
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
