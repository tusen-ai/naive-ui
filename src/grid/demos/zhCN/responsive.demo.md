# 响应式

`n-grid` 的 `cols` `x-gap` `y-gap`，`n-grid-item` 的 `span` `offset` 支持响应式参数配置。

`n-grid` 具有两种响应式模式，内部的 `n-grid-item` 遵从父级的模式。

`self` （默认）模式由 `n-grid` 自己的宽度控制响应式属性。一个响应式 `cols` 形如 `'2 400:4 600:6'`，即在小于 400px 的时候有 2 列，400px <= 并且 < 600px 的时候有 4 列，大于 600px 的时候有 6 列。

`screen` 模式由浏览器视口的宽度控制响应式属性，有 `xs` `s` `m` `l` `xl` `2xl` 几个屏幕尺寸可供选择。一个响应式 `cols` 形如 `2 s:3 m:4 l:5 xl:6 2xl:7`。

```html
<n-divider>Self 响应式</n-divider>
<n-grid cols="2 400:4 600:6">
  <n-grid-item>
    <div class="light-green">1</div>
  </n-grid-item>
  <n-grid-item>
    <div class="green">2</div>
  </n-grid-item>
  <n-grid-item>
    <div class="light-green">3</div>
  </n-grid-item>
  <n-grid-item>
    <div class="green">4</div>
  </n-grid-item>
  <n-grid-item>
    <div class="light-green">5</div>
  </n-grid-item>
  <n-grid-item>
    <div class="green">6</div>
  </n-grid-item>
</n-grid>
<n-divider>Screen 响应式</n-divider>
<n-grid cols="2 s:3 m:4 l:5 xl:6 2xl:7" responsive="screen">
  <n-grid-item>
    <div class="light-green">1</div>
  </n-grid-item>
  <n-grid-item>
    <div class="green">2</div>
  </n-grid-item>
  <n-grid-item>
    <div class="light-green">3</div>
  </n-grid-item>
  <n-grid-item>
    <div class="green">4</div>
  </n-grid-item>
  <n-grid-item>
    <div class="light-green">5</div>
  </n-grid-item>
  <n-grid-item>
    <div class="green">6</div>
  </n-grid-item>
  <n-grid-item>
    <div class="light-green">7</div>
  </n-grid-item>
</n-grid>
```

```css
.light-green {
  height: 108px;
  background-color: rgba(0, 128, 0, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
}
.green {
  height: 108px;
  background-color: rgba(0, 128, 0, 0.24);
  display: flex;
  align-items: center;
  justify-content: center;
}
```
