# Scroll To

```html
<n-space vertical>
  <n-space>
    <n-button @click="$refs.sider.scrollTo({ top: 120, behavior: 'smooth' })">
      Sider Scroll to 120px
    </n-button>
    <n-button @click="$refs.content.scrollTo({ top: 120, behavior: 'smooth' })">
      Content Scroll to 120px
    </n-button>
  </n-space>

  <n-layout style="height: 480px;">
    <n-layout-header style="height: 64px;"> Cool Header </n-layout-header>
    <n-layout position="absolute" style="top: 64px; bottom: 64px;">
      <n-layout-sider position="absolute" ref="sider" style="overflow: auto;">
        <n-h1>Long</n-h1><n-h1>Long</n-h1><n-h1>Long</n-h1> <n-h1>Long</n-h1
        ><n-h1>Long</n-h1><n-h1>Long</n-h1> <n-h1>Long</n-h1><n-h1>Long</n-h1
        ><n-h1>Long</n-h1> <n-h1>Long</n-h1><n-h1>Long</n-h1><n-h1>Long</n-h1>
      </n-layout-sider>
      <n-layout position="absolute" :native-scrollbar="false" ref="content">
        <n-h1>Long</n-h1><n-h1>Long</n-h1><n-h1>Long</n-h1> <n-h1>Long</n-h1
        ><n-h1>Long</n-h1><n-h1>Long</n-h1> <n-h1>Long</n-h1><n-h1>Long</n-h1
        ><n-h1>Long</n-h1> <n-h1>Long</n-h1><n-h1>Long</n-h1><n-h1>Long</n-h1>
      </n-layout>
    </n-layout>
    <n-layout-footer position="absolute" style="height: 64px">
      Cool Footer
    </n-layout-footer>
  </n-layout>
</n-space>
```
