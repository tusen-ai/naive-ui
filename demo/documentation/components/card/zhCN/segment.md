# 分段
`content`、`footer` 和 `action` 可以被 `hard` 或 `soft` 分段，分段分割线会在区域的上方出现。
```html
<n-card title="卡片分段示例" :segmented="{
  content: 'hard',
  footer: 'soft'
}">
  <template v-slot:header-extra>
    v-slot:header-extra
  </template>
  卡片内容
  <template v-slot:footer>
    v-slot:footer
  </template>
  <template v-slot:action>
    v-slot:action
  </template>
</n-card>
```
