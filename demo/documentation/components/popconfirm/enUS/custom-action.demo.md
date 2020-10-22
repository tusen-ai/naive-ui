# Custom Action
```html
<n-popconfirm>
  <template v-slot:trigger>
    <n-button>Quote</n-button>
  </template>
  For example, if I were to write about elephants, I’d have had no idea what words to use.
  <template v-slot:action>
    <n-button
      size="tiny"
    >
      Maybe
    </n-button>
  </template>
</n-popconfirm>
<n-popconfirm positive-text="Oops!">
  <template v-slot:trigger>
    <n-button>Quote</n-button>
  </template>
  For example, if I were to write about elephants, I’d have had no idea what words to use.
</n-popconfirm>
```
```css
.n-button {
  margin-right: 8px;
}
```