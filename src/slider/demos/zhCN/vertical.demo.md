# 垂直

设定 `vertical` 来启用垂直模式，它的高度默认依赖于容器的高度，你也可以自定义高度。

```html
<n-space style="height: 200px; justify-content: center;">
  <n-slider :default-value="77" vertical />
  <n-slider :default-value="30" vertical disabled />
  <n-slider :default-value="[20, 70]" vertical range />
</n-space>
```
