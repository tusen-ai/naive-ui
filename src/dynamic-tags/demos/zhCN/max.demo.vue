<markdown>
# 最大标签数量
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const tags = ref(['教师', '程序员'])
</script>

<template>
  <n-dynamic-tags v-model:value="tags" :max="3" />
</template>
