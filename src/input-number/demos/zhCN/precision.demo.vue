<markdown>
# 精度

设置 `precision` 属性可以控制数值精度。

使用 `precision` 会使 `update-value-on-input` 失效。
</markdown>

<template>
  <n-space vertical>
    <n-input-number clearable :precision="2" />
    <n-input-number clearable :precision="0" />
  </n-space>
</template>
