<markdown>
# Basic
</markdown>

<template>
  <n-breadcrumb>
    <n-breadcrumb-item href="#">
      <n-icon><md-cash /></n-icon> Home
    </n-breadcrumb-item>
    <n-breadcrumb-item href="#">
      <n-icon><md-cash /></n-icon> Account
    </n-breadcrumb-item>
    <n-breadcrumb-item href="#">
      <n-icon><md-cash /></n-icon> Category
    </n-breadcrumb-item>
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
