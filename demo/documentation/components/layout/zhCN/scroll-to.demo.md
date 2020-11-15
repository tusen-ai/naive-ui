# 滚动到
```html
<n-button
  @click="$refs.sider.scrollTo({ top: 120, behavior: 'smooth' })"
>
  边栏滚到 120px
</n-button>
<n-button
  @click="$refs.content.scrollTo({ top: 120, behavior: 'smooth' })"
>
  内容滚到 120px
</n-button>
<n-layout style="height: 480px;">
    <n-layout-header style="height: 64px;">
      酷的页头
    </n-layout-header>
    <n-layout position="absolute" style="top: 64px; bottom: 64px;">
      <n-layout-sider position="absolute" ref="sider" style="overflow: auto;">
        <n-h1>长</n-h1><n-h1>长</n-h1><n-h1>长</n-h1>
        <n-h1>长</n-h1><n-h1>长</n-h1><n-h1>长</n-h1>
        <n-h1>长</n-h1><n-h1>长</n-h1><n-h1>长</n-h1>
        <n-h1>长</n-h1><n-h1>长</n-h1><n-h1>长</n-h1>
      </n-layout-sider>
      <n-layout position="absolute" :native-scrollbar="false" ref="content">
        <n-h1>长</n-h1><n-h1>长</n-h1><n-h1>长</n-h1>
        <n-h1>长</n-h1><n-h1>长</n-h1><n-h1>长</n-h1>
        <n-h1>长</n-h1><n-h1>长</n-h1><n-h1>长</n-h1>
        <n-h1>长</n-h1><n-h1>长</n-h1><n-h1>长</n-h1>
      </n-layout>
    </n-layout>
    <n-layout-footer position="absolute" style="height: 64px">
      酷的页脚
    </n-layout-footer>
  </n-layout>
```
```css
.n-button {
  margin: 0 8px 12px 0;
}
```