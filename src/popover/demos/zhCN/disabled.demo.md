# 按钮禁用下可触发

按钮禁用不能屏蔽其他原生事件

```html
<n-popover trigger="hover">
  <template #trigger>
    <n-button disabled> 悬浮 </n-button>
  </template>
  <span>按钮禁用不影响 hover</span>
</n-popover>
```
