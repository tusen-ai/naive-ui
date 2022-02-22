<markdown>
# 使用边框

sider、footer、header 可以设定 `bordered`。
</markdown>

<template>
  <n-layout has-sider>
    <n-layout-sider bordered content-style="padding: 24px;">
      海淀桥
    </n-layout-sider>
    <n-layout>
      <n-layout-header bordered>
        颐和园路
      </n-layout-header>
      <n-layout-content content-style="padding: 24px;">
        平山道
      </n-layout-content>
      <n-layout-footer bordered>
        成府路
      </n-layout-footer>
    </n-layout>
  </n-layout>
</template>

<style>
.n-layout-header {
  padding: 24px;
}

.n-layout-footer {
  padding: 24px;
}
</style>
