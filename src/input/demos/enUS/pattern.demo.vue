<markdown>
# Limit input format

Use `allow-input` to limit input value to desired format. You can use it to achieve trim effect.
</markdown>

<script lang="ts" setup>
const onlyAllowNumber = (value: string) => !value || /^\d+$/.test(value)
const noSideSpace = (value: string) => !/ /g.test(value)
</script>

<template>
  <n-space vertical>
    <n-input
      type="text"
      :allow-input="onlyAllowNumber"
      placeholder="Only allow number"
    />
    <n-input
      type="textarea"
      :allow-input="noSideSpace"
      placeholder="No leading or trailing space"
    />
  </n-space>
</template>
