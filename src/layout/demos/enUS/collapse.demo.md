# Collapse Aside

Use `collapsed` prop to control status of aside. (The adjacent `n-layout-aside` and `n-layout-aside` must be `static` positioned.)

Aside has two `collapse-mode`, `width` & `transform`. `width` will actually change width of aside, `transform` will just move aside out of layout.

Use `collapsed-width` and `width` to set aside's width.

Use `show-trigger` to use builtin button.

```html
<n-space vertical size="large">
  <n-layout has-aside>
    <n-layout-aside
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
    </n-layout-aside>
    <n-layout-content content-style="padding: 24px"
      >Pingshan Road</n-layout-content
    >
  </n-layout>
  <n-layout has-aside>
    <n-layout-aside
      collapse-mode="transform"
      :collapsed-width="120"
      :width="240"
      show-trigger="arrow-circle"
      content-style="padding: 24px"
      bordered
    >
      <n-h2>Handian Bridge</n-h2>
    </n-layout-aside>
    <n-layout-content content-style="padding: 24px"
      >Pingshan Road</n-layout-content
    >
  </n-layout>
</n-space>
```
