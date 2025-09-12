<markdown>
# None debug
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const valueRef = ref('a')
const tabs = ['c', 'd']
const value = valueRef

function switchTabs() {
  if (valueRef.value === 'a') {
    valueRef.value = 'c'
  }
  else {
    valueRef.value = 'a'
  }
}
</script>

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
