<markdown>
# Finish debug
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const active = ref(false)
function handleFinish() {
  console.log('finish')
}
</script>

<template>
  <n-space>
    <span style="font-variant-numeric: tabular-nums">
      <n-countdown :duration="5000" :active="active" @finish="handleFinish" />
      <br>
      <n-countdown
        :duration="5000"
        :active="active"
        :precision="1"
        @finish="handleFinish"
      />
    </span>
    <n-switch v-model:value="active" />
  </n-space>
</template>
