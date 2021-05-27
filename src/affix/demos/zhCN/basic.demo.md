# 基础用法

Affix 有 `trigger-top`、`top`、`trigger-bottom` 和 `bottom` 属性。`trigger-top` 是顶部固定的触发距离，`top` 是在触发顶部固定之后 CSS 的 `top` 值。`trigger-bottom` 和 `bottom` 类似。

```html
<div class="container" ref="container">
  <div class="padding"></div>
  <div class="content">
    <n-grid :cols="2">
      <n-gi :span="1">
        <n-affix
          :top="120"
          :trigger-top="60"
          :listen-to="() => $refs.container"
        >
          <n-tag>顶部触发距离 60px</n-tag>
        </n-affix>
      </n-gi>
      <n-gi :span="1">
        <n-affix
          :bottom="120"
          :trigger-bottom="60"
          :listen-to="() => $refs.container"
        >
          <n-tag>底部触发距离 60px</n-tag>
        </n-affix>
      </n-gi>
    </n-grid>
  </div>
</div>
```

```css
.container {
  width: 100%;
  height: 200px;
  background-color: rgba(128, 128, 128, 0.3);
  border-radius: 3px;
  overflow: auto;
}

.padding {
  height: 150px;
  width: 100%;
  background-color: rgba(128, 128, 128, 0.15);
}

.content {
  height: 600px;
}
```
