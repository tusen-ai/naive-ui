# 偏移 
```html
<n-row :gutter="12">
  <n-col :span="6" :offset="6">
    <div class="red"></div>
  </n-col>
  <n-col :span="6" :offset="6">
    <div class="green"></div>
  </n-col>
</n-row>
```
```css
.red {
  height: 108px;
  background-color: rgba(128, 0, 0, .5);
}
.green {
  height: 108px;
  background-color: rgba(0, 128, 0, .5);
}
```
