<markdown>
# Limit input format

Use allow-input to limit input value to desired format. You can use it to achieve trim effect.
</markdown>

<script lang="ts" setup>
const onlyAllowNumber = (value: string) => !value || /^\d+$/.test(value)
function onlyAllowEnglish(value: string) {
  return !value || /^[a-zA-Z]+$/.test(value)
}
</script>

<template>
  <n-space vertical>
    <n-input-opt style="width: 300px" :allow-input="onlyAllowNumber" />
    <n-input-opt style="width: 300px" :allow-input="onlyAllowEnglish" />
  </n-space>
</template>
