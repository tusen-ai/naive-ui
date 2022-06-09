<markdown>
# Nested Debug 3
</markdown>

<template>
  <n-tooltip placement="bottom" trigger="click">
    <template #trigger>
      <n-button>VShow</n-button>
    </template>
    <n-popover trigger="click">
      <template #trigger>
        Test
      </template>
      Popover
    </n-popover>
  </n-tooltip>
  <n-tooltip placement="bottom" trigger="click">
    <template #trigger>
      <n-button>VIf</n-button>
    </template>
    <n-popover trigger="click">
      <template #trigger>
        Test
      </template>
      Popover
    </n-popover>
  </n-tooltip>
</template>
