<markdown>
# Max tag count
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const tags = ref(['teacher', 'programmer'])
</script>

<template>
  <n-dynamic-tags v-model:value="tags" :max="3" />
</template>
