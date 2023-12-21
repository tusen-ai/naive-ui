<markdown>
# 阻塞性方法 Debug

在调用`alert()`之类的阻塞性方法的时候，仍然可看到旋转动画，但不会有圆圈的收缩和伸展动画。
</markdown>

<template>
  <n-space>
    <n-button @click="handleClick">
      点此报警
    </n-button>
    <n-spin size="small" />
    <n-spin size="medium" />
    <n-spin size="large" />
  </n-space>
</template>

<script lang="ts" setup>
const handleClick = () => {
  window.alert('已举办!')
}
</script>
