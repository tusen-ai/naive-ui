<markdown>
# No indicator

If you don't want indicator.
</markdown>

<template>
  <n-progress
    style="margin: 0 8px 12px 0"
    type="circle"
    :show-indicator="false"
    status="success"
    :percentage="20"
  />
  <n-progress
    style="width: 120px; margin: 0 8px 12px 0"
    type="multiple-circle"
    :percentage="[50, 25]"
    :show-indicator="false"
  />
  <n-progress
    type="line"
    :show-indicator="false"
    status="success"
    :percentage="20"
  />
</template>
