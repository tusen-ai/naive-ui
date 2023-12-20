<markdown>
# Blocking method Debug

After invoked blocking method like `alert()`, you can still see the spin's rotating, but not the shrink and grow of the circle.
</markdown>

<template>
  <n-space>
    <n-button @click="handleClick">
      Click to Report
    </n-button>
    <n-spin size="small" />
    <n-spin size="medium" />
    <n-spin size="large" />
  </n-space>
</template>

<script lang="ts" setup>
const handleClick = () => {
  window.alert('Reported!')
}
</script>
