# 自定义操作
```html
<n-popconfirm>
  <template v-slot:trigger>
    <n-button>引用</n-button>
  </template>
  譬如，我或许可以就大象本身写一点什么，但对象的驯化却不知从何写起。
  <template v-slot:action>
    <n-button
      size="tiny"
    >
      或许吧
    </n-button>
  </template>
</n-popconfirm>
<n-popconfirm positive-text="噢!">
  <template v-slot:trigger>
    <n-button>引用</n-button>
  </template>
  譬如，我或许可以就大象本身写一点什么，但对象的驯化却不知从何写起。
</n-popconfirm>
```

```css
.n-button {
  margin-right: 8px;
}
```