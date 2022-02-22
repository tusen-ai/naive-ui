<markdown>
# 全屏幕

可以打开全屏，这样显得很专业。
</markdown>

<template>
  <n-watermark
    v-if="show"
    content="大家艰苦一下，一切都会有的"
    cross
    fullscreen
    :font-size="16"
    :line-height="16"
    :width="384"
    :height="384"
    :x-offset="12"
    :y-offset="60"
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
