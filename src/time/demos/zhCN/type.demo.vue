<markdown>
# 类型

`date`、`datetime` 或者 `relative`。
</markdown>

<script lang="ts" setup>
const time = new Date(0)
</script>

<template>
  <n-time :time="0" type="date" />
  <br>
  <n-time :time="time" type="datetime" />
</template>
