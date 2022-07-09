<markdown>
# Slots

Use `header` or `footer` slot to customize header or footer.
</markdown>

<template>
  <n-popover trigger="click">
    <template #trigger>
      <n-button>There's a divider</n-button>
    </template>
    <template #header>
      <n-text strong depth="1">
        Divider is on the bottom.
      </n-text>
    </template>
    Content.
    <template #footer>
      Divider is on the top.
    </template>
  </n-popover>
</template>
