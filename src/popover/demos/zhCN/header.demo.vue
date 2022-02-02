<markdown>
# 带标题

使用 `header` slot 来自定义标题。
</markdown>

<template>
  <n-popover trigger="click">
    <template #trigger>
      <n-button>提供这个接口是因为分割线不好写</n-button>
    </template>
    <template #header>
      <n-text strong depth="1">
        下面就是分割线
      </n-text>
    </template>
    上面就是分割线
  </n-popover>
</template>
