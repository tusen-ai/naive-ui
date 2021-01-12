# Segmented

`content`, `footer` can be `hard` or `soft` segmented. `action` can be segmented. Segment border will appear at the top of segmented parts.

```html
<n-card
  title="Card Segmented Demo"
  :segmented="{
  content: 'hard',
  footer: 'soft'
}"
>
  <template #header-extra> #header-extra </template>
  Card Content
  <template #footer> #footer </template>
  <template #action> #action </template>
</n-card>
```
