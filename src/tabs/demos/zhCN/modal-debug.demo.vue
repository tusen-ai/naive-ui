<markdown>
# Modal debug
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const showRef = ref(false)
const tabs = ['ccccc', 'dddddd']
const show = showRef
</script>

<template>
  <n-button @click="show = true">
    Show modal
  </n-button>
  <n-modal v-model:show="show" preset="card">
    <n-tabs type="segment">
      <n-tab v-for="tab in tabs" :key="tab" :name="tab">
        I'm {{ tab }}
      </n-tab>
    </n-tabs>
  </n-modal>
</template>
