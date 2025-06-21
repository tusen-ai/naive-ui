<markdown>
# Step time

Pass a number as an incremental step, or use an array to specify the values you want to show. If inputs do not adhere to these parameters, an invalid status will be shown (strikethrough text).
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const time = ref(1183135260000)
</script>

<template>
  <n-time-picker
    v-model:value="time"
    :hours="[8, 18]"
    :minutes="8"
    :seconds="[0]"
  />
</template>
