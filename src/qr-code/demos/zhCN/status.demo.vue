<markdown>
# 不同的状态

可以通过 `status` 的值控制二维码的状态，提供了 `active`、`expired`、`loading`、`scanned` 四个值。
</markdown>

<script lang="ts" setup>
function handleRefresh(): void {
  console.log('refresh')
}
</script>

<template>
  <n-space>
    <n-qr-code value="https://www.naiveui.com" status="loading" />
    <n-qr-code
      value="https://www.naiveui.com"
      status="expired"
      @refresh="handleRefresh"
    />
    <n-qr-code value="https://www.naiveui.com" status="scanned" />
  </n-space>
</template>
