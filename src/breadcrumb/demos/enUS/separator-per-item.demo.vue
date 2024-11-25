<markdown>
# Custom separator by item

Use separator prop or separator slot to custom separator of an item. When both are present, separator slot will be used.
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
  <n-breadcrumb>
    <n-breadcrumb-item separator=">">
      <n-icon><MdCash /></n-icon> Home
    </n-breadcrumb-item>
    <n-breadcrumb-item>
      <n-icon><MdCash /></n-icon> Account<template #separator>
        ~
      </template>
    </n-breadcrumb-item>
    <n-breadcrumb-item>
      <n-icon><MdCash /></n-icon> Category
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>
