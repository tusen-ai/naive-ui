<markdown>
# 不透明度

用 `show-alpha` 设定是否可调节 alpha 通道。
</markdown>

<script lang="ts" setup>
function handleConfirm(value: string) {
  console.log(value)
}
</script>

<template>
  <n-color-picker
    :show-alpha="false"
    :actions="['confirm']"
    @confirm="handleConfirm"
  />
</template>
