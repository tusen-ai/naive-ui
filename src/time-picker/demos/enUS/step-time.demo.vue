<markdown>
# Step time

Pass a number as an incremental step, or use an array to specify the values you want to show. If inputs do not adhere to these parameters, an invalid status will be shown (strikethrough text).
</markdown>
<template>
  <n-time-picker
    v-model:value="time"
    :hours="[8, 18]"
    :minutes="8"
    :seconds="[0]"
  />
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      time: ref(1183135260000)
    }
  }
})
</script>
