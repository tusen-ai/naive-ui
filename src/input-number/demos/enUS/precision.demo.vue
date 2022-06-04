<markdown>
# Precision

Set the `precision` property to control the numerical precision.

Use `precision` will disable `update-value-on-input`.
</markdown>

<template>
  <n-space vertical>
    <n-input-number clearable :precision="2" />
    <n-input-number clearable :precision="0" />
  </n-space>
</template>
