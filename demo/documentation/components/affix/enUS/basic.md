# Basic
```html
<div class="container">
  <div class="padding"></div>
  <div class="content">
    <n-affix :top="60"><n-tag>Top 50px</n-tag></n-affix>
    <!-- <n-affix :bottom="60" style="margin-left: 80px"><n-tag>Bottom 50px</n-tag></n-affix>
    <n-affix :top="60" :bottom="60" style="margin-left: 200px"><n-tag>Top 50px & Bottom 50px</n-tag></n-affix> -->
    <!-- <n-affix :bottom="60"><n-tag>Bottom 60px</n-tag></n-affix> -->
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
  position: relative;
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