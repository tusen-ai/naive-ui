<markdown>
# 禁用 inline 主题

naive-ui 默认情况下使用 inline style 作为主题变量的载体，因此每个组件上都会挂载许多 inline CSS。如果你需要 SSR，或者想让开发者工具看起来更干净，可以打开 `inline-theme-disabled` 属性。

注意，如果你需要频繁的改动 `theme-overrides`，不建议使用这个属性，这样会生成大量无用的 style 标签。

这个属性不是响应式的。
</markdown>

<template>
  <n-config-provider inline-theme-disabled>
    <n-button>不再有 inline CSS 变量的按钮</n-button>
  </n-config-provider>
</template>
