# Responsive

`n-grid`'s `cols`, `x-gap`, `y-gap` and `n-grid-item`'s `span`, `offset` support responsive config.

`n-grid` has 2 responsive mode. The inner `n-grid-item` follows its parent's mode.

Responsive props in `self`(default) mode are controlled by `n-grid`'s own width. A responsive `cols` looks like `'2 400:4 600:6'`. When < 400px there are 2 columns. When 400px <= && < 600px there are 4 columns. When > 600px there are 6 columns.

Responsive props in `screen`(default) mode are controlled by viewport width of the browser. There are `xs` `s` `m` `l` `xl` `2xl` screen width to choose. A responsive `cols` looks like `2 s:3 m:4 l:5 xl:6 2xl:7`.

```html
<n-divider>Self Responsive</n-divider>
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
<n-divider>Screen Responsive</n-divider>
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
