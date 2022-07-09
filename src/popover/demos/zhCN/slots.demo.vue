<markdown>
# 插槽

使用 `header` 与 `footer` 插槽来自定义标题或底部内容。
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
    内容
    <template #footer>
      上面就是分割线
    </template>
  </n-popover>
</template>
