<markdown>
# 基础用法

好在这颗树不是活的，也不平衡。
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('654321')
</script>

<template>
  <n-verification-code v-model="value" mask style="width: 300px" />
</template>
