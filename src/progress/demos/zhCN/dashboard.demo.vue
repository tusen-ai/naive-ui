<markdown>
# 仪表盘
可能你还需要`gapDegree` 和 `gapPosition` 两个属性来自定义仪表盘

</markdown>

<template>
  <n-space>
    <n-progress type="dashboard" gap-position="bottom" :percentage="50" />
    <n-progress
      type="dashboard"
      gap-position="bottom"
      :gap-degree="90"
      :percentage="50"
    />
  </n-space>
</template>
