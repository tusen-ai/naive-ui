# 折叠侧边栏

使用 `collapsed` 属性控制侧边栏状态。（对于 `absolute` position 的 `n-layout` 和 `n-layout-sider` 不生效。）

侧边栏有两种 `collapse-mode`：`width` 和 `transform`。`width` 会改变侧边栏的宽度，而 `transform` 只是将侧边栏挪出布局。

使用 `collapsed-width` 和 `width` 设置侧边栏的宽度。

```html
<n-switch v-model:value="collapsed" />
<n-layout style="height: 240px;">
  <n-layout-header style="height: 64px;"> 酷的页头 </n-layout-header>
  <n-layout has-sider position="absolute" style="top: 64px;">
    <n-layout-sider
      collapse-mode="width"
      :collapsed-width="120"
      :width="240"
      show-trigger
      v-model:collapsed="collapsed"
    >
      <p>边栏 边栏 边栏 边栏 边栏</p>
    </n-layout-sider>
    <n-layout style="padding: 24px">
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
  <n-layout position="absolute" style="top: 64px;" has-sider>
    <n-layout-sider
      collapse-mode="transform"
      :collapsed-width="120"
      :width="240"
      show-trigger
      v-model:collapsed="collapsed"
    >
      <n-h1>边栏</n-h1>
    </n-layout-sider>
    <n-layout style="padding: 24px">
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
