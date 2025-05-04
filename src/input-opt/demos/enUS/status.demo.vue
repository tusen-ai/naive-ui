<markdown>
# Status、

Disabled Status、 Error status、Readonly Status
</markdown>

<template>
  <n-space vertical>
    <n-space align="center">
      disabled:
      <n-input-opt default-value="123456" style="width: 300px" disabled />
    </n-space>
    <n-space align="center">
      readonly:
      <n-input-opt default-value="123456" style="width: 300px" readonly />
    </n-space>
    <n-space align="center">
      warning:
      <n-input-opt
        default-value="123456"
        style="width: 300px"
        status="warning"
      />
    </n-space>
    <n-space align="center">
      error:
      <n-input-opt default-value="123456" style="width: 300px" status="error" />
    </n-space>
  </n-space>
</template>
