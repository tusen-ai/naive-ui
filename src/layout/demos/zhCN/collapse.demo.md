# 折叠侧边栏

使用 `collapsed` 属性控制侧边栏状态。（关联的 `n-layout-sider` 和 `n-layout-content` 必须是 static position 的）。

侧边栏有两种 `collapse-mode`，`width` 和 `transform`。`width` 会改变侧边栏的宽度，而 `transform` 只是将侧边栏挪出布局。

使用 `collapsed-width` 和 `width` 设置侧边栏的宽度。

```html
<n-space vertical size="large">
  <n-layout has-sider>
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
  <n-layout has-sider>
    <n-layout-sider
      collapse-mode="transform"
      :collapsed-width="120"
      :width="240"
      show-trigger="arrow-circle"
      content-style="padding: 24px"
      bordered
    >
      <n-h2>海淀桥</n-h2>
    </n-layout-sider>
    <n-layout-content content-style="padding: 24px">平山道</n-layout-content>
  </n-layout>
</n-space>
```
