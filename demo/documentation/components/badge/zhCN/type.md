# 类型
标记有 `default`、`error`、`info`、`success`、`warning` 类型。
```html
<n-badge dot>
  <div class="block" />
</n-badge>
<n-badge dot type="error">
  <div class="block" />
</n-badge>
<n-badge dot type="info">
  <div class="block" />
</n-badge>
<n-badge dot type="success">
  <div class="block" />
</n-badge>
<n-badge dot type="warning">
  <div class="block" />
</n-badge>
```
```js
export default {
  data() {
    return {
      value: 10
    };
  }
};
```
```css
.n-badge {
  margin: 0 32px 8px 0;
}
.block {
  width: 32px;
  height: 32px;
  background-color: #dddddd;
  border-radius: 4px;
  transition: background-color .3s cubic-bezier(.4, 0, .2, 1);
}
.n-dark-theme .block {
  background-color: rgba(255, 255, 255, .15);
}
```