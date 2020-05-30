# 使用元素组件
Naive UI 提供 `n-element` 组件，参考 [Element](n-element)。
```html
<n-config-provider :theme="theme">
  <div style="background-color: rgba(128, 128, 128); padding: 8px;">
    <n-button @click="theme = 'dark'">深色</n-button>
    <n-button @click="theme = 'light'">浅色</n-button>
    <n-el as="span" class="oops">
      我是个 span 标签
    </n-el>
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
.oops {
  color: #000;
  transition: color .3s cubic-bezier(.4, 0, .2, 1);
}
.oops.n-light-theme {
  color: green
}
.oops.n-dark-theme {
  color: yellow
}
.n-button {
  margin: 0 12px 8px 0;
}
```