<markdown>
# 类型

`date`、`datetime` 或者 `relative`。
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
  <n-time :time="0" type="date" />
  <br>
  <n-time :time="time" type="datetime" />
</template>
