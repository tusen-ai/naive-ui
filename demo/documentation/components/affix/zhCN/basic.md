# 基础用法
Affix 有 `offset-top`、`top`、`offset-bottom` 和 `bottom` 属性。`offset-top` 是顶部固定的触发距离，`top` 是在触发顶部固定之后 CSS 的 `top` 值。`offset-bottom` 和 `bottom` 类似。
```html
<div class="container">
  <div class="padding"></div>
  <div class="content">
    <n-row>
      <n-col :span="12">
        <n-affix :top="120" :offset-top="60"><n-tag>顶部触发距离 60px</n-tag></n-affix>
      </n-col>
      <n-col :span="12">
        <n-affix :bottom="120" :offset-bottom="60"><n-tag>底部触发距离 60px</n-tag></n-affix>
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