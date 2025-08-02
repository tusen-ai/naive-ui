<markdown>
# Title Offset

When `title-placement` is set to `before` or `after`, the `offset` property can be used to adjust the spacing between the title and divider line.
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const beforeOffset = ref(0)
const afterOffset = ref(0)
</script>

<template>
  <n-input-number v-model:value="beforeOffset" :min="0" />
  <n-divider title-placement="before" :offset="beforeOffset">
    Before
  </n-divider>
  <n-input-number v-model:value="afterOffset" :min="0" />
  <n-divider title-placement="after" type="dashed" :offset="afterOffset">
    After
  </n-divider>
</template>
