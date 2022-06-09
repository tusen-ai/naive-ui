<markdown>
# Basic
</markdown>

<template>
  <n-breadcrumb>
    <n-breadcrumb-item><n-icon :component="MdCash" /> Home</n-breadcrumb-item>
    <n-breadcrumb-item>
      <n-icon :component="MdCash" /> Account</n-breadcrumb-item>
    <n-breadcrumb-item>
      <n-icon :component="MdCash" /> Category</n-breadcrumb-item>
  </n-breadcrumb>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { MdCash } from '@vicons/ionicons4'

export default defineComponent({
  setup () {
    return {
      MdCash
    }
  }
})
</script>
