<markdown>
# 定制

靠你了。
</markdown>

<template>
  <n-gradient-text
    :gradient="{
      from: 'rgb(85, 85, 85)',
      to: 'rgb(170, 170, 170)'
    }"
  >
    定制颜色
  </n-gradient-text>
  <br>
  <n-gradient-text
    :gradient="{
      deg: 180,
      from: 'rgb(85, 85, 85)',
      to: 'rgb(170, 170, 170)'
    }"
  >
    定制颜色
  </n-gradient-text>
  <br>
  <n-gradient-text
    gradient="linear-gradient(90deg, red 0%, green 50%, blue 100%)"
  >
    瞎写的颜色
  </n-gradient-text>
</template>

<style>
.n-gradient-text {
  font-size: 24px;
}
</style>
