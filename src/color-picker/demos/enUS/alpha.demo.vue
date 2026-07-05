<markdown>
# Alpha

Use `show-alpha` to control whether the alpha channel can be adjusted.
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
