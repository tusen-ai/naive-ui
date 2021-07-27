# Sider Placement

Sometimes you might want to put the collapsed sidebar on the right.

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
      <p>
        Handian Bridge Handian Bridge Handian Bridge Handian Bridge Handian
        Bridge
      </p>
    </n-layout-sider>
    <n-layout-content content-style="padding: 24px"
      >Pingshan Road</n-layout-content
    >
  </n-layout>
</n-space>
```
