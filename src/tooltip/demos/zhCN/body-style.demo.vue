<markdown>
# 主体样式

有时候设定主体样式还是挺有用的。
</markdown>

<template>
  <n-space>
    <n-tooltip :style="{ maxWidth: '400px' }" trigger="click">
      <template #trigger>
        <n-button> 加州女孩 </n-button>
      </template>
      我希望她们都是加州女孩，我希望她们都是加州女孩，我希望她们都是加州女孩
    </n-tooltip>
    <n-tooltip :style="{ maxWidth: '400px' }" trigger="click">
      <template #trigger>
        <n-button> 加州女孩 </n-button>
      </template>
      我希望...
    </n-tooltip>
  </n-space>
</template>
