# 分段
`header`、`content`、`footer` 和 `action` 可以被 `hard` 或 `soft` 分段。
```html
<n-card title="卡片分段示例" :segmented="{
  header: 'soft',
  content: 'hard',
  footer: 'hard'
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
