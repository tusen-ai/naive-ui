# Collapse Sider

Use `collapsed` prop to control status of sider. (The adjacent `n-layout-sider` and `n-layout-sider` must be `static` positioned.)

Sider has two `collapse-mode`, `width` & `transform`. `width` will actually change width of sider, `transform` will just move sider out of layout.

Use `collapsed-width` and `width` to set sider's width.

Use `show-trigger` to use builtin button.

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
      <p>
        Handian Bridge Handian Bridge Handian Bridge Handian Bridge Handian
        Bridge
      </p>
    </n-layout-sider>
    <n-layout-content content-style="padding: 24px"
      >Pingshan Road</n-layout-content
    >
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
      <n-h2>Handian Bridge</n-h2>
    </n-layout-sider>
    <n-layout-content content-style="padding: 24px"
      >Pingshan Road</n-layout-content
    >
  </n-layout>
</n-space>
```
