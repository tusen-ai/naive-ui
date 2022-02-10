<markdown>
# Dashboard
Maybe you also need `gapDegree` and `gapPosition` properties to customize the dashboard

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
