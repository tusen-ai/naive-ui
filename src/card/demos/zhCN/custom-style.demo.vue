<markdown>
# 自定义样式

卡片提供 `content-style`、`header-style`、`footer-style` 来帮助你自定义样式，比如你想要一个没有 padding 的卡片来往里面放一些乱七八糟的东西。
</markdown>

<template>
  <n-card content-style="padding: 0;">
    <n-tabs
      type="line"
      size="large"
      :tabs-padding="20"
      pane-style="padding: 20px;"
    >
      <n-tab-pane name="PARKLIFE">
        PARKLIFE
      </n-tab-pane>
      <n-tab-pane name="ROCKLIFE">
        ROCKLIFE
      </n-tab-pane>
    </n-tabs>
  </n-card>
</template>
