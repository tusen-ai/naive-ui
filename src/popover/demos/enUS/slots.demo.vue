<markdown>
# Slots

Use `header` `footer` slot to customize header and footer.
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
      <n-text strong depth="1">
        Divider is on the top.
      </n-text>
    </template>
  </n-popover>
</template>
