<markdown>
# Customize separator

Use separator prop to custom separator.
</markdown>

<script lang="ts">
import { MdCash } from '@vicons/ionicons4'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    MdCash
  }
})
</script>

<template>
  <n-breadcrumb separator=">">
    <n-breadcrumb-item>
      <n-icon><MdCash /></n-icon> Home
    </n-breadcrumb-item>
    <n-breadcrumb-item>
      <n-icon><MdCash /></n-icon> Account
    </n-breadcrumb-item>
    <n-breadcrumb-item>
      <n-icon><MdCash /></n-icon> Category
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>
