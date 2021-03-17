# 隐藏侧边栏内容

有时候收起边栏后，你不想看到里面有什么。

```html
<n-switch v-model:value="collapsed" />
<n-layout style="height: 240px;">
  <n-layout-header style="height: 64px;"> 酷的页头 </n-layout-header>
  <n-layout>
    <n-layout-sider
      collapse-mode="width"
      :show-content="!collapsed"
      :collapsed-width="120"
      :width="240"
      v-model:collapsed="collapsed"
      show-toggle-button
    >
      <n-h1>酷的边栏</n-h1>
    </n-layout-sider>
    <n-layout>
      <n-layout-content>
        <span>内容</span>
      </n-layout-content>
      <n-layout-footer>
        <n-h1>页脚</n-h1>
      </n-layout-footer>
    </n-layout>
  </n-layout>
</n-layout>
<n-layout style="height: 240px; overflow: hidden;">
  <n-layout-header position="absolute" style="height: 64px;">
    酷的页头
  </n-layout-header>
  <n-layout position="absolute" style="top: 64px;">
    <n-layout-sider
      position="absolute"
      collapse-mode="transform"
      :show-content="!collapsed"
      :collapsed-width="120"
      :width="240"
      v-model:collapsed="collapsed"
      show-toggle-button
    >
      <n-h1>边栏 边栏 边栏</n-h1>
    </n-layout-sider>
    <n-layout position="absolute">
      <span>内容</span>
    </n-layout>
  </n-layout>
</n-layout>
```

```js
export default {
  data () {
    return {
      collapsed: false
    }
  }
}
```
