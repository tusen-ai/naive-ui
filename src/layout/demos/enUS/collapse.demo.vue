<markdown>
# Collapse sider

Use `show-trigger` to use builtin button.
</markdown>

<template>
  <n-space vertical size="large">
    <n-layout has-sider>
      <n-layout-sider
        collapse-mode="width"
        :collapsed-width="120"
        :width="240"
        show-trigger="bar"
        content-style="padding: 24px;"
        bordered
      >
        <p>
          Handian Bridge Handian Bridge Handian Bridge Handian Bridge Handian
          Bridge
        </p>
      </n-layout-sider>
      <n-layout-content content-style="padding: 24px;">
        Pingshan Road
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
        <n-h2>Handian Bridge</n-h2>
      </n-layout-sider>
      <n-layout-content content-style="padding: 24px;">
        Pingshan Road
      </n-layout-content>
    </n-layout>
  </n-space>
</template>
