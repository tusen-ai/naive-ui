# 提供主题
使用配置提供者（Config Provider）来设定它全部的后代组件主题。

```html
<n-config-provider :theme="theme">
  <div style="background-color: rgba(128, 128, 128); padding: 8px;">
    <n-button @click="theme = 'dark'">深色</n-button>
    <n-button @click="theme = 'light'">浅色</n-button>
  </div>
</n-config-provider>
```
```js
export default {
  data () {
    return {
      theme: 'dark'
    }
  }
}
```
```css
.n-button {
  margin: 0 12px 8px 0;
}
```