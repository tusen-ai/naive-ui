# 折叠侧边栏
使用 `collapsed` 属性控制侧边栏状态。

侧边栏有两种 `collapse-mode`：`width`、`transform`。`width` 会改变侧边栏的宽度，而 `transform` 只是将侧边栏移除布局。

使用 `collapsed-width` 和 `width` 设置侧边栏的宽度。
```html
<n-switch v-model="collapsed" />
<n-layout>
  <n-layout-header style="height: 64px;">
    酷的页头
  </n-layout-header>
  <n-layout>
    <n-layout-sider
      collapse-mode="width"
      :collapsed-width="120"
      :width="240"
      :collapsed="collapsed"
      show-toggle-button
      @collapse="collapsed = true"
      @expand="collapsed = false"
    >
      <p>边栏 边栏 边栏 边栏 边栏</p>
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
<n-layout style="height: 240px;">
  <n-layout-header mode="absolute" style="height: 64px;">
    酷的页头
  </n-layout-header>
  <n-layout mode="absolute" style="top: 64px;">
    <n-layout-sider
      mode="absolute"
      collapse-mode="transform"
      :collapsed-width="120"
      :width="240"
      :collapsed="collapsed"
      show-toggle-button
      @collapse="collapsed = true"
      @expand="collapsed = false"
    >
      <n-h1>边栏</n-h1>
    </n-layout-sider>
    <n-layout 
      mode="absolute"
    >
      <span>内容</span>
    </n-layout>
  </n-layout>
</n-layout>
```
```js
export default {
  data () {
    return {
      collapsed: true
    }
  }
}
```
