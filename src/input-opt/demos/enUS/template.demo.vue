<markdown>
# Template slot

Define the template with your own UI elements and bind to the provided events and properties to replace the default design.
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('654321')
</script>

<template>
  <n-input-opt v-model:value="value" style="width: 300px">
    <template #default="{ attrs, index }">
      <n-input v-bind="attrs" placeholder="" />
      <span v-if="index === 1" style="padding-left: 4px; padding-right: 4px">
        <i>-</i>
      </span>
      <div v-if="index === 3" style="padding-left: 4px; padding-right: 4px">
        <i>-</i>
      </div>
    </template>
  </n-input-opt>
</template>
