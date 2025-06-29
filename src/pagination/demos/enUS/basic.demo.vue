<markdown>
# Basic
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const page = ref(2)
</script>

<template>
  <n-pagination v-model:page="page" :page-count="100" />
</template>
