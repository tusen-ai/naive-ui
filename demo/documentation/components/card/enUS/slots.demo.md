# Slots
Card has many slots to help you write less code.
```html
<n-card title="Card Slots Demo">
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
