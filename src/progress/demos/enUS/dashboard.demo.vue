<markdown>
# Dashboard

Maybe you also need `gap-degree` and `gap-offset-degree` properties to customize the dashboard.
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
