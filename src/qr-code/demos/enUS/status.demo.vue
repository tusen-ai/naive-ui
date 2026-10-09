<markdown>
# Status

The status can be controlled by the value of `status`. Four values of `active`, `expired`, `loading`, and `scanned` are provided.
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
