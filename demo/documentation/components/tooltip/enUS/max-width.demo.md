# Max Width
Setting max-width is sometimes more useful.
```html
<n-tooltip :max-width="400" trigger="click">
  <template v-slot:activator>
    <n-button>
      California Girls
    </n-button>
  </template>
  I wish they all could be California girls. I wish they all could be California
  girls. I wish they all could be California girls.
</n-tooltip>
<n-tooltip :max-width="400" trigger="click">
  <template v-slot:activator>
    <n-button>
      California Girls
    </n-button>
  </template>
  I wish ...
</n-tooltip>
```
```css
.n-button {
  margin: 0 12px 8px 0;
}
```