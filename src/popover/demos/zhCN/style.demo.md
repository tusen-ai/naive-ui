# 主体样式

可以通过设定 style 来设置 popover 的样式。

```html
<n-popover :style="{ width: '500px' }" trigger="hover">
  <template #trigger>
    <n-button style="margin:0;"> 宽度 500px </n-button>
  </template>
  <span>长得像根条一样</span>
</n-popover>
```
