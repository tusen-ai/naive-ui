# 触发按钮 Debug

免费附赠一个触发按钮。

```html
<n-switch v-model:value="collapsed" />
<n-layout>
  <n-layout-sider
    collapse-mode="width"
    show-trigger
    :collapsed-width="120"
    :width="240"
    :collapsed="collapsed"
    @collapse="collapsed = true"
    @expand="collapsed = false"
  >
    <n-h1>边栏</n-h1>
  </n-layout-sider>
  <n-layout style="height: 240px; padding: 24px;">
    <n-layout-content>
      <span>内容</span>
    </n-layout-content>
    <n-layout-footer>
      <n-h1>页脚</n-h1>
    </n-layout-footer>
  </n-layout>
</n-layout>
<n-layout style="overflow: hidden;">
  <n-layout-sider
    show-trigger="arrow-circle"
    collapse-mode="transform"
    :collapsed-width="120"
    :width="240"
    :collapsed="collapsed"
    @collapse="collapsed = true"
    @expand="collapsed = false"
  >
    <n-h1>边栏</n-h1>
  </n-layout-sider>
  <n-layout style="height: 240px; padding: 24px;">
    <n-layout-content>
      <span>内容</span>
    </n-layout-content>
    <n-layout-footer>
      <n-h1>页脚</n-h1>
    </n-layout-footer>
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
