<markdown>
# Width debug
</markdown>

<template>
  <n-popover style="max-width: 200px">
    <template #trigger>
      <n-button>1</n-button>
    </template>
    111111 111111 111111 111111 111111 111111 111111 111111 111111 111111 111111
    111111 111111 111111 111111
  </n-popover>
  <n-popover :style="{ maxWidth: '200px' }">
    <template #trigger>
      <n-button>2</n-button>
    </template>
    111111 111111 111111 111111 111111 111111 111111 111111 111111 111111 111111
    111111 111111 111111 111111
  </n-popover>
  <n-popover style="max-width: 200px">
    <template #trigger>
      3
    </template>
    111111 111111 111111 111111 111111 111111 111111 111111 111111 111111 111111
    111111 111111 111111 111111
  </n-popover>
  <n-popover :style="{ width: '100px' }">
    <template #trigger>
      <n-button>5</n-button>
    </template>
    111111 111111 111111 111111 111111 111111 111111 111111 111111 111111 111111
    111111 111111 111111 111111
  </n-popover>
  <n-popover style="width: 100px">
    <template #trigger>
      6
    </template>
    111111 111111 111111 111111 111111 111111 111111 111111 111111 111111 111111
    111111 111111 111111 111111
  </n-popover>
  <n-tooltip style="max-width: 200px">
    <template #trigger>
      <n-button>1</n-button>
    </template>
    111111 111111 111111 111111 111111 111111 111111 111111 111111 111111 111111
    111111 111111 111111 111111
  </n-tooltip>
  <n-tooltip :style="{ maxWidth: '200px' }">
    <template #trigger>
      <n-button>2</n-button>
    </template>
    111111 111111 111111 111111 111111 111111 111111 111111 111111 111111 111111
    111111 111111 111111 111111
  </n-tooltip>
  <n-tooltip style="max-width: 200px">
    <template #trigger>
      3
    </template>
    111111 111111 111111 111111 111111 111111 111111 111111 111111 111111 111111
    111111 111111 111111 111111
  </n-tooltip>
  <n-tooltip :style="{ width: '100px' }">
    <template #trigger>
      <n-button>5</n-button>
    </template>
    111111 111111 111111 111111 111111 111111 111111 111111 111111 111111 111111
    111111 111111 111111 111111
  </n-tooltip>
  <n-tooltip style="width: 100px">
    <template #trigger>
      6
    </template>
    111111 111111 111111 111111 111111 111111 111111 111111 111111 111111 111111
    111111 111111 111111 111111
  </n-tooltip>
</template>
