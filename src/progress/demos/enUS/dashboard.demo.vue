<markdown>
# Dashboard

Maybe you also need `gap-degree` and `gap-offset-degree` properties to customize the dashboard.
</markdown>

<template>
  <n-space>
    <n-progress type="dashboard" :percentage="50" />
    <n-progress
      type="dashboard"
      :gap-offset-degree="90"
      :gap-degree="90"
      :percentage="50"
    />
  </n-space>
</template>
