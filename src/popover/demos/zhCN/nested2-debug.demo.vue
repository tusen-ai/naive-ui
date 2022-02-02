<markdown>
# Nested Debug
</markdown>

<template>
  <n-tooltip placement="bottom">
    <template #trigger>
      <n-popover trigger="click">
        <template #trigger>
          <n-button>Test</n-button>
        </template>
        Popover
      </n-popover>
    </template>
    Tooltip
  </n-tooltip>
  <n-tooltip trigger="hover">
    <template #trigger>
      <n-popconfirm>
        <template #trigger>
          <n-button>tooltip内嵌popconfirm</n-button>
        </template>
        一切都将一去杳然，任何人都无法将其捕获。
      </n-popconfirm>
    </template>
    如果它长得像鸭子，走起来像鸭子，叫起来也像鸭子，那它一定是个鸭子。
  </n-tooltip>
</template>
