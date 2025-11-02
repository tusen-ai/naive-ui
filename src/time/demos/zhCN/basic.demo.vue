<markdown>
# 基础用法
</markdown>

<script lang="ts" setup>
const time = new Date(0)
</script>

<template>
  <n-time :time="0" />
  <br>
  <n-time :time="time" />
</template>
