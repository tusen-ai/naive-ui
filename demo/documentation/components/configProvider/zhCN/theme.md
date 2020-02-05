# 主题
设置 Config Provider 内部组件的主题。
```html
<n-config-provider :theme="theme">
  <n-button @click="theme = 'dark'">深色</n-button>
  <n-button @click="theme = 'light'">浅色</n-button>
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
