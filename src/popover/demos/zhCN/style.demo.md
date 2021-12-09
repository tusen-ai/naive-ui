# 主体样式

可以通过设定 style 来设置 popover 的样式。

```html
<n-space>
  <n-popover :style="{ width: '500px' }" trigger="hover">
    <template #trigger>
      <n-button style="margin:0;">宽度 500px</n-button>
    </template>
    长得像根条一样
  </n-popover>
  <n-popover :style="{ maxWidth: '100px' }" trigger="hover">
    <template #trigger>
      <n-button style="margin:0;">最大宽度 100px</n-button>
    </template>
    内容长度不确定的时候，设置最大宽度可能更好看
  </n-popover>
</n-space>
```
