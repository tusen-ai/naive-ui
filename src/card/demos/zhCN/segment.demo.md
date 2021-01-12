# 分段

`content` 和 `footer` 可以被 `hard` 或 `soft` 分段，`action` 可以被分段。分段分割线会在区域的上方出现。

```html
<n-card
  title="卡片分段示例"
  :segmented="{
  content: 'hard',
  footer: 'soft'
}"
>
  <template #header-extra> #header-extra </template>
  卡片内容
  <template #footer> #footer </template>
  <template #action> #action </template>
</n-card>
```
