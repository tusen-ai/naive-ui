# Basic
Affix has `offset-top`, `top`, `offset-bottom` and `bottom`. `offset-top` is top affixing trigger point. `top` is the style `top` value after top affixing is trigger. `offset-bottom` and `bottom` work in similar way.
```html
<div class="container">
  <div class="padding"></div>
  <div class="content">
    <n-row>
      <n-col :span="12">
        <n-affix :top="120" :offset-top="60"><n-tag>Affix Trigger Top 60px</n-tag></n-affix>
      </n-col>
      <n-col :span="12">
        <n-affix :bottom="120" :offset-bottom="60"><n-tag>Affix Trigger Bottom 60px</n-tag></n-affix>
      </n-col>
    </n-row>
  </div>
</div>
```
```css
.container {
  width: 100%;
  height: 200px;
  background-color: rgba(128, 128, 128, .3);
  border-radius: 6px;
  overflow: auto;
}

.padding {
  height: 150px;
  width: 100%;
  background-color: rgba(128, 128, 128, .15);
}

.content {
  height: 600px;
}
```