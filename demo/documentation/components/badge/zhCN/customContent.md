# 自定义内容
在里面插入一些自定义内容。
```html
<n-badge value="新">
  <div class="block" />
</n-badge>
<n-badge value="火">
  <div class="block" />
</n-badge>
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