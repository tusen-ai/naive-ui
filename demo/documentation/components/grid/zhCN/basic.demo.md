# 基础用法
```html
<n-row gutter="12">
  <n-col :span="6">
    <div class="light-green"></div>
  </n-col>
  <n-col :span="6">
    <div class="green"></div>
  </n-col>
  <n-col :span="6">
    <div class="light-green"></div>
  </n-col>
  <n-col :span="6">
    <div class="green"></div>
  </n-col>
</n-row>
```
```css
.light-green {
  height: 108px;
  background-color: rgba(0, 128, 0, .12);
}
.green {
  height: 108px;
  background-color: rgba(0, 128, 0, .24);
}
```