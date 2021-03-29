# Trigger Button

A trigger button, for free.

```html
<n-switch v-model:value="collapsed" />
<n-layout style="height: 240px;">
  <n-layout-header style="height: 64px;"> Cool Header </n-layout-header>
  <n-layout position="absolute" style="top: 64px;" has-sider>
    <n-layout-sider
      collapse-mode="width"
      show-trigger
      :collapsed-width="120"
      :width="240"
      v-model:collapsed="collapsed"
    >
      <n-h1>Sider</n-h1>
    </n-layout-sider>
    <n-layout style="padding: 24px;"> Content </n-layout>
  </n-layout>
</n-layout>
<n-layout style="height: 240px; overflow: hidden;">
  <n-layout-header position="absolute" style="height: 64px;">
    Cool Header
  </n-layout-header>
  <n-layout position="absolute" style="top: 64px;" has-sider>
    <n-layout-sider
      show-trigger="arrow-circle"
      collapse-mode="transform"
      :collapsed-width="120"
      :width="240"
      v-model:collapsed="collapsed"
    >
      <n-h1>Sider</n-h1>
    </n-layout-sider>
    <n-layout position="absolute" style="padding: 24px;"> Content </n-layout>
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
