<markdown>
# Status

Readonly, disabled, warning, error status.
</markdown>

<template>
  <n-space vertical>
    <n-input-otp :default-value="'123456'.split('')" readonly />
    <n-input-otp :default-value="'123456'.split('')" disabled />
    <n-input-otp :default-value="'123456'.split('')" status="warning" />
    <n-input-otp :default-value="'123456'.split('')" status="error" />
  </n-space>
</template>
