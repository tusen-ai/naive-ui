<markdown>
# Finish debug
</markdown>

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

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      active: ref(false),
      handleFinish: () => {
        console.log('finish')
      }
    }
  }
})
</script>
