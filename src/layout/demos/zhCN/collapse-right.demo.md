# 折叠侧边栏的位置

有时候你可能想将折叠侧边栏放在右侧。

```html
<n-space vertical size="large">
  <n-layout has-sider sider-placement="right">
    <n-layout-sider
      collapse-mode="width"
      :collapsed-width="120"
      :width="240"
      show-trigger="arrow-circle"
      content-style="padding: 24px"
      bordered
    >
      <p>海淀桥 海淀桥 海淀桥 海淀桥 海淀桥</p>
    </n-layout-sider>
    <n-layout-content content-style="padding: 24px">平山道</n-layout-content>
  </n-layout>
</n-space>
```
