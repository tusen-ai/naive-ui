# Vertical

Set `vertical` to enable the vertical mode. Its height depends on the height of the container by default, and you can also customize the height.

```html
<n-space style="height: 200px; justify-content: center;">
  <n-slider :default-value="77" vertical />
  <n-slider :default-value="30" vertical disabled />
  <n-slider :default-value="[20, 70]" vertical range />
</n-space>
```
