# 主体样式
有时候设定主体样式还是挺有用的。
```html
<n-tooltip :body-style="{ maxWidth: '400px' }" trigger="click">
  <template v-slot:trigger>
    <n-button>
      加州女孩
    </n-button>
  </template>
  我希望她们都是加州女孩，我希望她们都是加州女孩，我希望她们都是加州女孩
</n-tooltip>
<n-tooltip :body-style="{ maxWidth: '400px' }" trigger="click">
  <template v-slot:trigger>
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