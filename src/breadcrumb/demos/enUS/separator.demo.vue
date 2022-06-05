<markdown>
# Customize separator

Use separator prop to custom separator.
</markdown>

<template>
  <n-breadcrumb separator=">">
    <n-breadcrumb-item>
      <n-icon><md-cash /></n-icon> Home</n-breadcrumb-item>
    <n-breadcrumb-item>
      <n-icon><md-cash /></n-icon> Account</n-breadcrumb-item>
    <n-breadcrumb-item>
      <n-icon><md-cash /></n-icon> Category</n-breadcrumb-item>
  </n-breadcrumb>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { MdCash } from '@vicons/ionicons4'

export default defineComponent({
  components: {
    MdCash
  }
})
</script>
