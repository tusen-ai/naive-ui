# Grid Debug

```html
<n-space vertical>
  <div class="grid-list">
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
  </div>
  <div class="grid-list">
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
  </div>
</n-space>
```

```css
.grid-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, 100px);
  gap: 20px;
}
.item {
  background-color: tomato;
  height: 100px;
}
```
