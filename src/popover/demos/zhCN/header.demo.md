# 带标题

```html
<n-space>
  <n-popover trigger="click">
    <template #trigger>
      <n-button>点击</n-button>
    </template>
    <template #header> I am title </template>
    <span>或许不想知道你的花园长得咋样</span>
  </n-popover>
  <n-popover trigger="click" title="I am title">
    <template #trigger>
      <n-button>点击</n-button>
    </template>
    <span>或许不想知道你的花园长得咋样</span>
  </n-popover>
</n-space>
```
