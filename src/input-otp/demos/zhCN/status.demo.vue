<markdown>
# 状态

只读状态、禁用状态、警告状态、错误状态。
</markdown>

<template>
  <n-space vertical>
    <n-input-otp :default-value="'123456'.split('')" readonly />
    <n-input-otp :default-value="'123456'.split('')" disabled />
    <n-input-otp :default-value="'123456'.split('')" status="warning" />
    <n-input-otp :default-value="'123456'.split('')" status="error" />
  </n-space>
</template>
