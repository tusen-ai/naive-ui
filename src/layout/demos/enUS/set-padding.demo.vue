<markdown>
# About setting padding

If you still want to do so, please make sure you know about their DOM structure.
</markdown>

<template>
  <n-space vertical size="large">
    <n-layout has-sider style="height: 240px">
      <n-layout-sider style="padding: 24px">
        <n-h2>... Not Recommended</n-h2>
        <n-h2>... Not Recommended</n-h2>
        <n-h2>... Not Recommended</n-h2>
        <n-h2>... Not Recommended</n-h2>
        <n-h2>... Not Recommended</n-h2>
        <n-h2>... Not Recommended</n-h2>
        <n-h2>... Not Recommended</n-h2>
        <n-h2>... Not Recommended</n-h2>
      </n-layout-sider>
    </n-layout>
    <n-layout has-sider style="height: 240px">
      <n-layout-sider content-style="padding: 24px;">
        <n-h2>Recommended</n-h2>
        <n-h2>Recommended</n-h2>
        <n-h2>Recommended</n-h2>
        <n-h2>Recommended</n-h2>
        <n-h2>Recommended</n-h2>
        <n-h2>Recommended</n-h2>
        <n-h2>Recommended</n-h2>
        <n-h2>Recommended</n-h2>
      </n-layout-sider>
    </n-layout>
  </n-space>
</template>
<style>
.n-layout-sider {
  background: rgba(128, 128, 128, 0.3);
}
</style>
