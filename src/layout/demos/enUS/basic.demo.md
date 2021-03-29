# Basic

```html
<n-layout>
  <n-layout-header> Cool Header </n-layout-header>
  <n-layout-content> Cool Content </n-layout-content>
  <n-layout-footer> Cool Footer </n-layout-footer>
</n-layout>
<br />
<n-layout>
  <n-layout-header> Cool Header </n-layout-header>
  <n-layout has-sider>
    <n-layout-sider> Cool Sider </n-layout-sider>
    <n-layout-content> Cool Content </n-layout-content>
  </n-layout>
  <n-layout-footer> Cool Footer </n-layout-footer>
</n-layout>
<br />
<n-layout has-sider>
  <n-layout-sider> Cool Sider </n-layout-sider>
  <n-layout>
    <n-layout-header> Cool Header </n-layout-header>
    <n-layout-content> Cool Content </n-layout-content>
    <n-layout-footer> Cool Footer </n-layout-footer>
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
