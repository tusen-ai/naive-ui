<markdown>
# 仪表盘

可能你还需要`gap-degree` 和 `gap-offset-degree` 两个属性来自定义仪表盘。
</markdown>

<template>
  <n-space>
    <n-progress type="dashboard" gap-position="bottom" :percentage="50" />
    <n-progress
      type="dashboard"
      :gap-offset-degree="90"
      :gap-degree="90"
      :percentage="50"
    />
  </n-space>
</template>
