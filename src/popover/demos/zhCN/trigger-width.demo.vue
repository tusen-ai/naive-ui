<markdown>
# 使用触发元素的宽度

设定 `width="trigger"` 使 popover 的宽度等于触发元素。
</markdown>

<template>
  <n-popover width="trigger">
    <template #trigger>
      <n-button>I would like to leave this city</n-button>
    </template>
    This old town don't smell too pretty and I can feel the warning signs
    running around my mind
  </n-popover>
</template>
