# Basic

`n-grid-item` has an alias called `n-gi`.

```html
<n-grid x-gap="12" :cols="4">
  <n-gi>
    <div class="light-green"></div>
  </n-gi>
  <n-gi>
    <div class="green"></div>
  </n-gi>
  <n-gi>
    <div class="light-green"></div>
  </n-gi>
  <n-gi>
    <div class="green"></div>
  </n-gi>
</n-grid>
```

```css
.light-green {
  height: 108px;
  background-color: rgba(0, 128, 0, 0.12);
}
.green {
  height: 108px;
  background-color: rgba(0, 128, 0, 0.24);
}
```
