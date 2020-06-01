# Position
Affix can be `absolute` or `fixed` positioned. You may need some css tricks to make it works as following. By default position is set to `fixed`, because in most cases scrolled element is `#document`.
```html
<div class="absolute-anchor-container">
  <div class="container">
    <div class="padding"></div>
    <div class="content">
      <div style="display: inline-block; width: 50%;">
        <n-affix :offset-top="50" position="absolute"><n-tag>Affix Trigger Top 50px</n-tag></n-affix>
      </div>
      <div style="display: inline-block; width: 50%;">
        <n-affix :offset-bottom="60" position="absolute"><n-tag>Affix Trigger Bottom 60px</n-tag></n-affix>
      </div>
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
  border-radius: 3px;
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