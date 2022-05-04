<markdown>
# 绝对定位模式

所有布局组件可以使用绝对定位。如果你期望内容在固定的区域内滚动，可以使用 `absolute` 模式。
</markdown>

<template>
  <div style="height: 360px; position: relative">
    <n-layout position="absolute">
      <n-layout-header style="height: 64px; padding: 24px" bordered>
        颐和园路
      </n-layout-header>
      <n-layout has-sider position="absolute" style="top: 64px; bottom: 64px">
        <n-layout-sider bordered content-style="padding: 24px;">
          海淀桥
        </n-layout-sider>
        <n-layout content-style="padding: 24px;">
          <n-h2>平山道</n-h2>
          <n-h2>平山道</n-h2>
          <n-h2>平山道</n-h2>
          <n-h2>平山道</n-h2>
          <n-h2>平山道</n-h2>
          <n-h2>平山道</n-h2>
          <n-h2>平山道</n-h2>
          <n-h2>平山道</n-h2>
          <n-h2>平山道</n-h2>
          <n-h2>平山道</n-h2>
          <n-h2>平山道</n-h2>
          <n-h2>平山道</n-h2>
        </n-layout>
      </n-layout>
      <n-layout-footer
        bordered
        position="absolute"
        style="height: 64px; padding: 24px"
      >
        城府路
      </n-layout-footer>
    </n-layout>
  </div>
</template>
