<markdown>
# Zindex debug
</markdown>

<script lang="ts" setup></script>

<template>
  <n-space>
    <n-popover trigger="click" :z-index="3000">
      <template #trigger>
        <n-button>Hover</n-button>
      </template>
      <span>I wish they all could be California girls</span>
      <n-popover trigger="click" :z-index="3000">
        <template #trigger>
          <n-button>Click</n-button>
        </template>
        <span>I wish they all could be California girls</span>
      </n-popover>
    </n-popover>
  </n-space>
</template>
