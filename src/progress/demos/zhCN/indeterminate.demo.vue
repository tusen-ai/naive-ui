<markdown>
# 动画进度条

使用 `indeterminate` 属性来设置不确定的进度， `duration` 来控制动画持续时间
</markdown>

<template>
  <n-space vertical>
    <n-progress type="line" :percentage="60" indeterminate :duration="5" />

    <n-progress
      type="line"
      :percentage="60"
      indicator-placement="inside"
      indeterminate
      :duration="5"
    />
  </n-space>
</template>
