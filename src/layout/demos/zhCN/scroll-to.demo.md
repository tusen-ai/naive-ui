# 滚动到

```html
<n-space vertical size="large">
  <n-space>
    <n-button @click="$refs.aside.scrollTo({ top: 120, behavior: 'smooth' })">
      边栏滚到 120px
    </n-button>
    <n-button @click="$refs.content.scrollTo({ top: 120, behavior: 'smooth' })">
      内容滚到 120px
    </n-button>
  </n-space>
  <n-layout style="height: 360px;">
    <n-layout-header style="height: 64px; padding: 24px;" bordered
      >颐和园路</n-layout-header
    >
    <n-layout has-aside position="absolute" style="top: 64px; bottom: 64px;">
      <n-layout-aside ref="aside" bordered content-style="padding: 24px;">
        <n-h2>海淀桥</n-h2>
        <n-h2>海淀桥</n-h2>
        <n-h2>海淀桥</n-h2>
        <n-h2>海淀桥</n-h2>
        <n-h2>海淀桥</n-h2>
        <n-h2>海淀桥</n-h2>
        <n-h2>海淀桥</n-h2>
        <n-h2>海淀桥</n-h2>
        <n-h2>海淀桥</n-h2>
        <n-h2>海淀桥</n-h2>
        <n-h2>海淀桥</n-h2>
        <n-h2>海淀桥</n-h2>
      </n-layout-aside>
      <n-layout-content
        ref="content"
        content-style="padding: 24px;"
        :native-scrollbar="false"
      >
        <n-h2>平山道</n-h2>
        <n-h2>平山道</n-h2>
        <n-h2>平山道</n-h2>
        <n-h2>平山道</n-h2>
        <n-h2>平山道</n-h2>
        <n-h2>平山道</n-h2>
        <n-h2>平山道</n-h2>
        <n-h2>平山道</n-h2>
        <n-h2>平山道</n-h2>
        <n-h2>平山道</n-h2>
        <n-h2>平山道</n-h2>
        <n-h2>平山道</n-h2>
      </n-layout-content>
    </n-layout>
    <n-layout-footer
      bordered
      position="absolute"
      style="height: 64px; padding: 24px;"
    >
      成府路
    </n-layout-footer>
  </n-layout>
</n-space>
```
