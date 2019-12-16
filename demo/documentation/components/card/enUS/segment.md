# Segmented
`header`, `content`, `footer` and `action` can be `hard` or `soft` segmented.
```html
<n-card title="Card Segmented Demo" :segmented="{
  header: 'soft',
  content: 'hard',
  footer: 'hard'
}">
  <template v-slot:header-extra>
    v-slot:header-extra
  </template>
  Card Content
  <template v-slot:footer>
    v-slot:footer
  </template>
  <template v-slot:action>
    v-slot:action
  </template>
</n-card>
```
