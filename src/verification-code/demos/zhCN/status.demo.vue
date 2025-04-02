<markdown>
# 状态

好在这颗树不是活的，也不平衡。
</markdown>

<template>
  <n-space vertical>
    <n-space align="center">
      disabled:
      <n-verification-code default-value="123456" style="width: 300px" disabled />
    </n-space>
    <n-space align="center">
      readonly:
      <n-verification-code default-value="123456" style="width: 300px" readonly />
    </n-space>
    <n-space align="center">
      warning:
      <n-verification-code default-value="123456" style="width: 300px" status="warning" />
    </n-space>
    <n-space align="center">
      error:
      <n-verification-code default-value="123456" style="width: 300px" status="error" />
    </n-space>
  </n-space>
</template>
