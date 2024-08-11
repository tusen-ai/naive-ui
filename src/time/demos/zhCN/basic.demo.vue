<markdown>
# 基础用法
</markdown>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {
      time: new Date(0)
    }
  }
})
</script>

<template>
  <n-time :time="0" />
  <br>
  <n-time :time="time" />
</template>
