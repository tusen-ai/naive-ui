<markdown>
# Hide sider content

Sometimes you don't want to see content inside sider after it's collapsed. Set `show-collapsed-content` to `false` on sider.
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
        Handian Bridge Handian Bridge Handian Bridge Handian Bridge Handian
        Bridge
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
