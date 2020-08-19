# Segmented
`content`, `footer` can be `hard` or `soft` segmented. `action` can be segmented. Segment border will appear at the top of segmented parts.
```html
<n-card title="Card Segmented Demo" :segmented="{
  content: 'hard',
  footer: 'soft'
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
