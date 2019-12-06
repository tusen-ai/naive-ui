# Position
Affix can be `absolute` or `fix` positioned. You may need some css tricks to make it works as following. By default position is set to `fix`, because in most cases scrolled element is `#document`.
```html
<div class="absolute-anchor-container">
  <div class="container">
    <div class="padding"></div>
    <div class="content">
      <n-row>
        <n-col :span="12">
          <n-affix :top="60" position="absolute"><n-tag>Top 50px</n-tag></n-affix>
        </n-col>
        <n-col :span="12">
          <n-affix :bottom="60" position="absolute"><n-tag>Bottom 60px</n-tag></n-affix>
        </n-col>
      </n-row>
    </div>
  </div>
</div>
```
```css
.absolute-anchor-container {
  width: 100%;
  height: 200px;
  position: relative;
}

.container {
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