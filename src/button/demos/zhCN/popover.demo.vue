<markdown>
# 配合 Popover 的特殊情况

原生的 disabled 的 button 不会触发鼠标，因此 `n-popover` 无法监听到相关的事件。如果你需要在这种情况下使用，可以使用 `tag` 属性来调整 button 的行为。
</markdown>

<template>
  <n-space>
    <n-tooltip>
      <template #trigger>
        <n-button disabled tag="div">
          突破
        </n-button>
      </template>
      工作遇到困难，齐心协力一起解决
    </n-tooltip>
    <n-button>两天加班换一天调休</n-button>
    <n-tooltip>
      <template #trigger>
        <n-button disabled tag="div">
          惦记
        </n-button>
      </template>
      你必然一身才华，才会被这么多人惦记
    </n-tooltip>
  </n-space>
</template>
