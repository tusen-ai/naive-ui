<markdown>
# Custom indicator

You can custom the indicator.
</markdown>

<template>
  <n-progress type="circle" :percentage="20">
    <span style="text-align: center">20% is small</span>
  </n-progress>
  <n-progress type="line" status="success" :percentage="20">
    Don't put too much content here.
  </n-progress>
</template>
