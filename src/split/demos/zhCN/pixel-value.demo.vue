<markdown>
# 使用像素值控制尺寸

自 `2.38.2` 开始，`min`、`max`、`size` 和 `default-size` 属性可以接受像素值。
</markdown>

<template>
  <n-split
    direction="horizontal"
    style="height: 200px"
    max="300px"
    min="100px"
    default-size="200px"
  >
    <template #1>
      Pane 1:<br>
      min 100px<br>
      default 200px<br>
      max 300px
    </template>
    <template #2>
      Pane 2
    </template>
  </n-split>
</template>
