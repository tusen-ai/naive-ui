<markdown>
# 仪表盘

可能你还需要`gap-degree` 和 `gap-offset-degree` 两个属性来自定义仪表盘。
</markdown>

<template>
  <n-space>
    <n-progress type="dashboard" gap-position="bottom" :percentage="80" />
    <n-progress
      type="dashboard"
      :gap-offset-degree="120"
      :gap-degree="120"
      :percentage="80"
    />
  </n-space>
</template>
