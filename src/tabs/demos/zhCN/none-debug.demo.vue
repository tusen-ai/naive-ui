<markdown>
# None debug
</markdown>

<template>
  <n-button @click="switchTabs">
    Switch tabs
  </n-button>
  <n-tabs v-model:value="value">
    <n-tab v-for="tab in tabs" :key="tab" :name="tab">
      I'm {{ tab }}
    </n-tab>
  </n-tabs>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'

export default defineComponent({
  setup () {
    const valueRef = ref('a')
    const switchTabs = () => {
      if (valueRef.value === 'a') {
        valueRef.value = 'c'
      } else {
        valueRef.value = 'a'
      }
    }
    return {
      tabs: ['c', 'd'],
      switchTabs,
      value: valueRef
    }
  }
})
</script>
