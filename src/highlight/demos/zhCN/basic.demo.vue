<markdown>
  # 基础
</markdown>

<script lang="ts" setup>
const text
  = 'Naive UI 是一个 Vue3 的组件库，它比较完整，主题可调，用 TypeScript 写的，快。'
const patterns = ['Naive UI', 'Vue3', 'TypeScript', '快']
</script>

<template>
  <n-highlight :text="text" :patterns="patterns" />
</template>
