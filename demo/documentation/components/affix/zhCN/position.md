# 位置
Affix 可以 `absolute` 或者 `fixed` 定位。你可能还需要写一些额外的 CSS 才能让达到例子的效果。 默认情况下位置是 `fixed`，因为大多数情况下，滚动的元素是 `#document`.
```html
<div class="absolute-anchor-container">
  <div class="container">
    <div class="padding"></div>
    <div class="content">
      <div style="display: inline-block; width: 50%;">
        <n-affix :offset-top="50" position="absolute"><n-tag>顶部触发距离 50px</n-tag></n-affix>
      </div>
      <div style="display: inline-block; width: 50%;">
        <n-affix :offset-bottom="60" position="absolute"><n-tag>底部触发距离 60px</n-tag></n-affix>
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