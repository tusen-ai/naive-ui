<markdown>
# Format tooltip
</markdown>

<template>
  <n-slider
    :default-value="50"
    :step="10"
    :format-tooltip="(value) => `${value}%`"
  />
</template>
