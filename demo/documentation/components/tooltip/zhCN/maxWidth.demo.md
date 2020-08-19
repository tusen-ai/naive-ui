# 最大宽度
有时候设定最大宽度还是挺有用的。
```html
<n-tooltip :max-width="400" trigger="click">
  <template v-slot:activator>
    <n-button>
      加州女孩
    </n-button>
  </template>
  我希望她们都是加州女孩，我希望她们都是加州女孩，我希望她们都是加州女孩
</n-tooltip>
<n-tooltip :max-width="400" trigger="click">
  <template v-slot:activator>
    <n-button>
      加州女孩
    </n-button>
  </template>
  我希望...
</n-tooltip>
```
```css
.n-button {
  margin: 0 12px 8px 0;
}
```