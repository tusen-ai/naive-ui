# 滚动到

```html
<n-space vertical :size="12">
  <n-space>
    <n-button @click="$refs.sider.scrollTo({ top: 120, behavior: 'smooth' })">
      边栏滚到 120px
    </n-button>
    <n-button @click="$refs.content.scrollTo({ top: 120, behavior: 'smooth' })">
      内容滚到 120px
    </n-button>
  </n-space>
  <n-layout style="height: 480px;">
    <n-layout-header style="height: 64px;"> 酷的页头 </n-layout-header>
    <n-layout position="absolute" style="top: 64px; bottom: 64px;" has-sider>
      <n-layout-sider ref="sider" style="overflow: auto;">
        <n-h1>长</n-h1><n-h1>长</n-h1><n-h1>长</n-h1> <n-h1>长</n-h1
        ><n-h1>长</n-h1><n-h1>长</n-h1> <n-h1>长</n-h1><n-h1>长</n-h1
        ><n-h1>长</n-h1> <n-h1>长</n-h1><n-h1>长</n-h1><n-h1>长</n-h1>
      </n-layout-sider>
      <n-layout :native-scrollbar="false" ref="content">
        <n-h1>长</n-h1><n-h1>长</n-h1><n-h1>长</n-h1> <n-h1>长</n-h1
        ><n-h1>长</n-h1><n-h1>长</n-h1> <n-h1>长</n-h1><n-h1>长</n-h1
        ><n-h1>长</n-h1> <n-h1>长</n-h1><n-h1>长</n-h1><n-h1>长</n-h1>
      </n-layout>
    </n-layout>
    <n-layout-footer position="absolute" style="height: 64px">
      酷的页脚
    </n-layout-footer>
  </n-layout>
</n-space>
```
