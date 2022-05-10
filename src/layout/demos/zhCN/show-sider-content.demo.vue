<markdown>
# 隐藏侧边栏内容

有时候收起边栏后，你不想看到里面有什么，你可以设定 `show-collapsed-content` 为 `false`。
</markdown>

<template>
  <n-space vertical size="large">
    <n-layout has-sider>
      <n-layout-sider
        collapse-mode="width"
        :collapsed-width="120"
        :width="240"
        :show-collapsed-content="false"
        show-trigger="arrow-circle"
        content-style="padding: 24px;"
        bordered
      >
        海淀桥 海淀桥 海淀桥 海淀桥 海淀桥
      </n-layout-sider>
      <n-layout-content content-style="padding: 24px;">
        平山道
      </n-layout-content>
    </n-layout>
    <n-layout has-sider>
      <n-layout-sider
        collapse-mode="transform"
        :collapsed-width="120"
        :width="240"
        show-trigger="arrow-circle"
        content-style="padding: 24px;"
        bordered
      >
        <n-h2>海淀桥</n-h2>
      </n-layout-sider>
      <n-layout-content content-style="padding: 24px;">
        平山道
      </n-layout-content>
    </n-layout>
  </n-space>
</template>
