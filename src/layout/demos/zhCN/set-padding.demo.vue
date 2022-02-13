<markdown>
# 关于设定 Padding

naive-ui 不推荐直接在 `n-layout-sider` 和 `n-layout` 上设定 padding。因为他们存在嵌套的 DOM 结构，你可以使用 `content-style` 来设定可滚动内容的样式。
</markdown>

<template>
  <n-space vertical size="large">
    <n-layout has-sider style="height: 240px">
      <n-layout-sider style="padding: 24px">
        <n-h2>... 不推荐</n-h2>
        <n-h2>... 不推荐</n-h2>
        <n-h2>... 不推荐</n-h2>
        <n-h2>... 不推荐</n-h2>
        <n-h2>... 不推荐</n-h2>
        <n-h2>... 不推荐</n-h2>
        <n-h2>... 不推荐</n-h2>
        <n-h2>... 不推荐</n-h2>
      </n-layout-sider>
    </n-layout>
    <n-layout has-sider style="height: 240px">
      <n-layout-sider content-style="padding: 24px;">
        <n-h2>推荐</n-h2>
        <n-h2>推荐</n-h2>
        <n-h2>推荐</n-h2>
        <n-h2>推荐</n-h2>
        <n-h2>推荐</n-h2>
        <n-h2>推荐</n-h2>
        <n-h2>推荐</n-h2>
        <n-h2>推荐</n-h2>
      </n-layout-sider>
    </n-layout>
  </n-space>
</template>
<style>
.n-layout-sider {
  background: rgba(128, 128, 128, 0.3);
}
</style>
