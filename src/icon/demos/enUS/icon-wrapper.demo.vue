<markdown>
# Icon with background

Sometimes it looks better with a background.
</markdown>

<script lang="ts" setup>
import Checkmark16Filled from '@vicons/fluent/Checkmark16Filled'
</script>

<template>
  <n-icon-wrapper :size="24" :border-radius="10">
    <n-icon :size="18" :component="Checkmark16Filled" />
  </n-icon-wrapper>
</template>
